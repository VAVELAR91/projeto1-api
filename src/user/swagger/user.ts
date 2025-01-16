import { ApiProperty, OmitType } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';
import { UserDTO } from '../dto/user.dto';

export class UserSwagger implements UserDTO {
  @ApiProperty({ description: 'id', example: uuid() })
  readonly id: string;

  @ApiProperty({ description: 'Nome', example: 'John Doe' })
  readonly name: string;

  @ApiProperty({ description: 'Nome de usuário', example: 'JohnDoe' })
  readonly username: string;

  @ApiProperty({ description: 'Senha', example: '123456' })
  readonly password: string;
}

export class UserSwaggerResponse extends OmitType(UserSwagger, ['password']) {
  @ApiProperty()
  readonly createdAt: Date;
}

export class UserSwaggerPost extends OmitType(UserSwagger, ['id']) {}

export class UserSwaggerPut extends OmitType(UserSwagger, ['id', 'password']) {}
