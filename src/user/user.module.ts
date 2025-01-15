import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Registra o repositório do User
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Exporta o UserService para que o AuthModule possa usá-lo
})
export class UserModule {}
