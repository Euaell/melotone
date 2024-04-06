import { DataSource, } from 'typeorm';
import typeOrmConfig from './typeorm.config';

const dataSource = new DataSource(typeOrmConfig as any);

export default dataSource;