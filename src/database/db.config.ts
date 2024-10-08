import { registerAs } from '@nestjs/config';
import devDbConfig from './dev.config';
// import { CognitoService } from 'src/aws/cognito/cognito.service';

export default registerAs('typeOrmConfig', async () => {
  let data = {
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    dbName: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
  };

  return {
    default: {
      type: 'postgres',
      host: data.host,
      port: parseInt(data.port),
      username: data.username,
      password: data.password,
      database: data.dbName,
      autoLoadEntities: true,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
      migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
      cli: {
        migrationsDir: __dirname + '/../migrations',
      },
      synchronize: process.env.DB_SYNC === 'true',
      logging: true,
      pool: {
        max: 25,
        min: 1,
        maxWaitingClients: 10,
        idleTimeoutMillis: 300000,
      },
    },
  };
});
