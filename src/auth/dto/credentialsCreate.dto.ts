import { ApiProperty } from '@nestjs/swagger';
import { CredentialsDto } from './credentials.dto';

export class CredentialsCreateDto extends CredentialsDto {
  @ApiProperty({ description: 'Nome', example: 'John Doe' })
  name: string;
}
