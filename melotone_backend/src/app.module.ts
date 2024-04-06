import { Module } from '@nestjs/common';
import { HandsModule } from './hands/hands.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import typeOrmConfig from './typeorm.config';

@Module({
    imports: [HandsModule, TypeOrmModule.forRoot(typeOrmConfig), UsersModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
