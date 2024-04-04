import { Module } from '@nestjs/common';
import { HandsModule } from './hands/hands.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configInstance } from '../config';
import { UsersModule } from './users/users.module';

const typeOrmModule = TypeOrmModule.forRoot({
    type: 'postgres',
    host: configInstance.postgresql_host,
    port: configInstance.postgresql_port,
    username: configInstance.postgresql_user,
    password: configInstance.postgresql_password,
    database: configInstance.postgresql_database,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    // autoLoadEntities: true,
    synchronize: true,
});

@Module({
    imports: [HandsModule, typeOrmModule, UsersModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
