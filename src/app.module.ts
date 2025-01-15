import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { postgresConnectionOptions } from './config/orm.postgre';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(postgresConnectionOptions),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
