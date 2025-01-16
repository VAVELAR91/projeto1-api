import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your_secret_key', // Substitua pelo seu segredo
      signOptions: { expiresIn: '24h' }, // Tempo de expiração do token
    }),
    UserModule, // Importa o módulo de usuários
  ],
  providers: [AuthService, JwtStrategy], // Registra o JwtStrategy
  controllers: [AuthController],
})
export class AuthModule {}
