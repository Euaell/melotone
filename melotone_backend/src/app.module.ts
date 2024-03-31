import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { HandsModule } from './hands/hands.module';

@Module({
    imports: [HandsModule],
    controllers: [],
    providers: [AppService],
})
export class AppModule {}
