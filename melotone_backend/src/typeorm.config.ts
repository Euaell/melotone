import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { configInstance } from '../config';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: configInstance.postgresql_host,
  port: configInstance.postgresql_port,
  username: configInstance.postgresql_user,
  password: configInstance.postgresql_password,
  database: configInstance.postgresql_database,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsRun: true,
  migrationsTableName: 'migrations_typeorm',
  synchronize: true,
  useUTC: true,
};

export default typeOrmConfig;