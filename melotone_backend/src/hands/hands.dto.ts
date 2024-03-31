import { IsNotEmpty, IsUUID } from 'class-validator'
export class CreateHandDto {
    @IsNotEmpty()
    name: string;
}

export class UpdateHandDto {
    @IsNotEmpty()
    name: string;
}

export class HandDto {
    @IsUUID()
    id: string;

    @IsNotEmpty()
    name: string;
}

export class HandResponseDto {
    hand: HandDto | null;
}

export class HandsResponseDto {
    hands: HandDto[];
}
