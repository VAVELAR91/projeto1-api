import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ETimeout } from 'src/utils/enums/timeout';
import { UserService } from '../user/user.service';
import { AuthCredentials } from './dto/auth.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { CredentialsCreateDto } from './dto/credentialsCreate.dto';
import { AuthUser } from './types/auth.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async generateToken(payload: object): Promise<AuthCredentials> {
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: 'refresh',
        expiresIn: '24h',
      }),
      type: 'JWT',
      expiresIn: ETimeout['24h'],
    };
  }

  async signIn({
    username,
    password,
  }: CredentialsDto): Promise<AuthCredentials> {
    const user = await this.userService.findOneByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: _, ...result } = user;
      const payload = { sub: result.id, username: result.username };
      return this.generateToken(payload);
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async signUp(credentials: CredentialsCreateDto): Promise<AuthCredentials> {
    const user = await this.userService.create(credentials);
    if (user) {
      const { password: _, ...result } = user;
      const payload = { sub: result.id, username: result.username };
      return this.generateToken(payload);
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: AuthUser) {
    const payload = { username: user.username, sub: user.id };
    return this.generateToken(payload);
  }
}
