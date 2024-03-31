import exp from "constants";

export class CreateHandDto {
    name: string;
}

export class UpdateHandDto {
    name: string;
}

export class HandDto {
    id: string;
    name: string;
}

export class HandResponseDto {
    hand: HandDto | null;
}

export class HandsResponseDto {
    hands: HandDto[];
}
