import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { cpf: createUserDto.cpf },
    })
    if (user) {
      return false;
    }
    const created = await this.usersRepository.save(createUserDto);
    if (created) {
      return created;
    }
    return false;
  }

  async findAll(limit: number, start: number): Promise<User[]> {
    const skip = (start - 1) * limit;
    return await this.usersRepository.find({ skip, take: limit });
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { id },
    });
  }

  async findOneBy(cpf: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { cpf },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<boolean> {
    await this.usersRepository.delete(id);
    const oldUser = await this.usersRepository.findOne(
      {
        where: { id },
      }
    )
    if (oldUser) {
      return true;
    }
    return false;
  }
}
