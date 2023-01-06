import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUser, UpdateUser, ListUser, ListOneUser, DeleteUser } from '@/data/use-cases';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Usuários')
@ApiResponse({ status: 200, description: 'Ok' })
export class UsersController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly updateUser: UpdateUser,
    private readonly listUser: ListUser,
    private readonly listOneUser: ListOneUser,
    private readonly deleteUser: DeleteUser
  ) {}

  @Post('/usuario')
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUser.create(createUserDto);
  }

  @Get('/usuarios')
  findAll() {
    return this.listUser.list();
  }

  @Get('/usuario/:id')
  findOne(@Param('id') id: string) {
    return this.listOneUser.listOne({ id: id });
  }

  @Patch('/usuario/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUser.update({ id: id, ...updateUserDto });
  }

  @Delete('/usuario/:id')
  remove(@Param('id') id: string) {
    return this.deleteUser.delete({ id: id });
  }
}
