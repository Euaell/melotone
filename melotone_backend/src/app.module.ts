import { Module } from '@nestjs/common';
import { HandsModule } from './hands/hands.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hands } from './hands/hands.entity';

const typeOrmModule = TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5415,
    username: 'geek',
    password: '123456789',
    database: 'melotone_db',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    // entities: [Hands],
    // autoLoadEntities: true,
    synchronize: true,
});

@Module({
    imports: [HandsModule, typeOrmModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
