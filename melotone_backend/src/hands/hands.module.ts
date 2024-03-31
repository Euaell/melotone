import { Module } from '@nestjs/common';
import { HandsController } from './hands.controller';
import { HandsService } from './hands.service';

@Module({
    imports: [],
    controllers: [HandsController],
    providers: [HandsService],
})
export class HandsModule {}
