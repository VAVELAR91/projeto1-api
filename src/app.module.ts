import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1senha2', // Substitua pelo seu
      database: 'svs', // Substitua pelo seu
      entities: [User],
      synchronize: true, // Somente para desenvolvimento
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
