import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import dbConfig from './db.config';

ConfigModule.forRoot({
  isGlobal: true,
});

const datasource = async () => {
  const data = (await dbConfig()).default;
  delete data.cli;
  delete data.autoLoadEntities;
  delete data.pool;
  const dataSource = new DataSource(data as PostgresConnectionOptions);
  return dataSource;
};
export default datasource();
