import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUserDto } from './dto/auth-user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';

@Controller()
@ApiTags('Usuários')
@ApiResponse({ status: 200, description: 'Ok' })
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post('/usuario')
  async create(@Body() createUserDto: CreateUserDto) {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
    const hash = await bcrypt.hash(createUserDto.password, saltRounds);
    const isCreated = await this.usersService.create({
      ...createUserDto,
      password: hash,
    });
    if (!isCreated) {
      throw new HttpException('Usuário não criado!', HttpStatus.NO_CONTENT);
    }
    return isCreated;
  }

  @Get('/usuarios/?')
  async findAll(
    @Query('limit') limit: number,
    @Query('start') start: number
  ) {
    return await this.usersService.findAll(limit, start);
  }

  @Get('/usuario/:id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch('/usuario/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete('/usuario/:id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
