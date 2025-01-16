import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDto {
  @ApiProperty({ description: 'Nome de usuário', example: 'JohnDoe' })
  username: string;

  @ApiProperty({ description: 'Senha do usuário', example: '123456' })
  password: string;
}
