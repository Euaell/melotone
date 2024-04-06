import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';
import { IUser } from './users.interface';
import { faker } from '@faker-js/faker';
import { UUID } from 'crypto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'UserRepository',
          useValue: {
            find: jest.fn(() => []),
            findOne: jest.fn(() => ({})),
            save: jest.fn((user: CreateUserDto): IUser => {
              const newUser: IUser = {
                id: faker.string.uuid() as UUID,
                ...user,
              }
              return newUser;
            }),
            merge: jest.fn(() => ({})),
            remove: jest.fn(() => true),
          }
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = {
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'password',
    };
    const createdUser = await service.create(user);
    expect(createdUser).toHaveProperty('id');
    expect(createdUser).toHaveProperty('name', user.name);
    expect(createdUser).toHaveProperty('email', user.email);
    expect(createdUser).toHaveProperty('password', user.password);
  });

  it('should find all users', async () => {
    const users = await service.findAll();
    expect(users).toEqual([]);
  });

  it('should find a user by id', async () => {
    const user = await service.findOne(faker.string.uuid() as UUID);
    expect(user).toEqual({});
  });
});
