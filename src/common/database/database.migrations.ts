import { DataSource, DataSourceOptions } from 'typeorm';
import { databaseConfig } from '../configs/database.config';

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.userName,
  password: databaseConfig.password,
  database: databaseConfig.dbName,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/**/*.js'],
  migrationsRun: true,
  logging: true,
};

const AppSource = new DataSource(typeOrmConfig);

export default AppSource;
