import { Injectable, Logger } from '@nestjs/common';
import { IHand } from './hands.interface';
import { CreateHandDto, UpdateHandDto } from './hands.dto';
import { UUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hands } from './hands.entity';
import { FindOperator, Repository } from 'typeorm';
import { Equal } from 'typeorm';

function convertToTypeORMUUID(id: UUID | string) {
    return Equal(
        id.toString(),
    ) as FindOperator<`${string}-${string}-${string}-${string}-${string}`>;
}

@Injectable()
export class HandsService {
    private readonly logger = new Logger(HandsService.name);
    constructor(
        @InjectRepository(Hands)
        private handsRepository: Repository<Hands>,
    ) {}

    async create(hand: CreateHandDto): Promise<IHand | undefined> {
        // Save the hand object to the database
        return this.handsRepository.save(hand);
    }

    findAll(): Promise<IHand[]> {
        return this.handsRepository.find();
    }

    findOne(id: UUID | string): Promise<IHand | undefined> {
        return this.handsRepository.findOne({
            where: { id: convertToTypeORMUUID(id) },
        });
    }

    async update(
        id: UUID | string,
        hand: UpdateHandDto,
    ): Promise<IHand | undefined> {
        // Find the hand with the given id
        const handToUpdate = await this.handsRepository.findOne({
            where: { id: convertToTypeORMUUID(id) },
        });
        if (!handToUpdate) {
            return undefined;
        }
        // Update the hand object with the new hand object
        this.handsRepository.merge(handToUpdate, hand);

        await this.handsRepository.save(handToUpdate);
        return handToUpdate;
    }

    async remove(id: UUID | string): Promise<boolean> {
        // Find the hand with the given id
        const handToRemove = await this.handsRepository.findOne({
            where: { id: convertToTypeORMUUID(id) },
        });
        if (!handToRemove) {
            return false;
        }
        // Remove the hand object
        await this.handsRepository.remove(handToRemove);
        return true;
    }
}
