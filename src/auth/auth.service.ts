import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { CredentialsDto } from './dto/credentials.dto';
import { CredentialsCreateDto } from './dto/credentialsCreate.dto';
import { AuthUser } from './types/auth.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ username, password }: CredentialsDto): Promise<AuthUser> {
    const user = await this.userService.findOneByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: _, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async signUp(credentials: CredentialsCreateDto): Promise<AuthUser> {
    const user = await this.userService.create(credentials);
    if (user) return user;

    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: AuthUser) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
