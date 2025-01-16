import { IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
