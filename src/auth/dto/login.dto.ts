import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Nome de usuário', example: 'testuser' })
  username: string;

  @ApiProperty({ description: 'Senha do usuário', example: '12345' })
  password: string;
}
