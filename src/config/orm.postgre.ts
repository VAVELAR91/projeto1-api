import 'dotenv/config';
import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const postgresConnectionOptions: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User],
  synchronize: process.env.NODE_ENV === 'development',
};

export const dataSource = new DataSource({
  ...postgresConnectionOptions,
  migrations: [],
});
