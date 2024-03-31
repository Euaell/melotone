import { Injectable } from "@nestjs/common";
import  { IHand } from "./hands.interface";
import { CreateHandDto, UpdateHandDto } from "./hands.dto";
import { UUID, randomUUID } from "crypto";

@Injectable()
export class HandsService {
    private hands: IHand[] = [];

    create(hand: CreateHandDto): IHand {
        // Create a new hand object
        const newHand: IHand = {
            id: randomUUID(),
            ...hand,
        };
        // Add the new hand object to the array
        this.hands.push(newHand);
        // Return the new hand object
        return newHand;
    }

    findAll(): IHand[] {
        return this.hands;
    }

    findOne(id: UUID | string): IHand | undefined {
        if (typeof id === "string") {
            id = id as UUID;
        }
        return this.hands.find((hand) => hand.id === id);
    }

    update(id: UUID | string, hand: UpdateHandDto): IHand | undefined {

        if (typeof id === "string") {
            id = id as UUID;
        }
        const index = this.hands.findIndex((hand) => hand.id === id);
        if (index === -1) {
            return undefined;
        }

        this.hands[index] = {
            id: id as UUID,
            ...hand,
        };
        return this.hands[index];
    }

    remove(id: UUID | string): boolean {
        if (typeof id === "string") {
            id = id as UUID;
        }
        const preLength = this.hands.length;
        this.hands = this.hands.filter((hand) => hand.id !== id);
        return this.hands.length < preLength;
    }
}