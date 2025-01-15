import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthUser } from '../types/auth.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Expiração dos tokens será respeitada
      secretOrKey: 'your_secret_key', // Substitua pelo seu segredo JWT
    });
  }

  async validate(payload: AuthUser) {
    // Aqui você pode validar o payload do token (ex.: buscar o usuário no banco)
    return { userId: payload.sub, username: payload.username };
  }
}
