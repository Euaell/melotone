import { Module } from '@nestjs/common';
import { HandsController } from './hands.controller';
import { HandsService } from './hands.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hands } from './hands.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Hands])],
    controllers: [HandsController],
    providers: [HandsService],
    exports: [],
})
export class HandsModule {}
