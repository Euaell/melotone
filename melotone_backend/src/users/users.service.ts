import { Injectable, Logger, UseFilters } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Equal, FindOperator, Repository } from 'typeorm';
import { UUID } from 'crypto';
import { IUser } from './users.interface';
import { hash, compare } from './users.utils';
import { TypeOrmExceptionFilter } from 'src/exception';

function convertToTypeORMUUID(id: UUID | string) {
  return Equal(
      id.toString(),
  ) as FindOperator<`${string}-${string}-${string}-${string}-${string}`>;
}

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<IUser | undefined> {
    // hash the password
    user.password = await hash(user.password);
    return this.usersRepository.save(user);
  }

  findAll(): Promise<IUser[]> {
    return this.usersRepository.find();
  }

  findOne(id: UUID | string): Promise<IUser | undefined> {
    return this.usersRepository.findOne({
      where: { id: convertToTypeORMUUID(id) },
    });
  }

  async update(
    id: UUID | string, 
    updateUserDto: UpdateUserDto
    ): Promise<IUser | undefined> {
    // Find the user with the given id
    const userToUpdate = await this.usersRepository.findOne({
      where: { id: convertToTypeORMUUID(id) },
    });
    if (!userToUpdate) {
      return undefined;
    }

    if (updateUserDto.password) {
      // hash the password
      updateUserDto.password = await hash(updateUserDto.password);
    }
    
    // Update the user object with the new user object
    this.usersRepository.merge(userToUpdate, updateUserDto);

    await this.usersRepository.save(userToUpdate);
    return userToUpdate;
  }

  async remove(id: UUID | string): Promise<boolean> {
    // Find the user with the given id
    const userToRemove = await this.usersRepository.findOne({
      where: { id: convertToTypeORMUUID(id) },
    });
    if (!userToRemove) {
      return false;
    }
    await this.usersRepository.remove(userToRemove);
    return true;
  }
}
