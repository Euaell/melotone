import { IsString, IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class UpdateUserDto {
    @IsString()
    name?: string;

    @IsEmail()
    email?: string;

    @IsString()
    password?: string;
}

export class UserDto {
    @IsUUID()
    id: string;

    @IsString()
    name: string;

    @IsEmail()
    email: string;
}

export class UserResponseDto {
    user: UserDto | null;
}

export class UsersResponseDto {
    users: UserDto[];
}
