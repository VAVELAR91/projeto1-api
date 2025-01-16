export class AuthCredentials {
  readonly accessToken: string;
  readonly type: 'JWT';
  readonly expiresIn: number;
  readonly refreshToken: string;
}
