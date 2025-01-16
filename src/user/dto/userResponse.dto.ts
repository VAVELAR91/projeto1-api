import { OmitType } from '@nestjs/mapped-types';
import { UserDTO } from './user.dto';

export class UserResponseDTO extends OmitType(UserDTO, ['password']) {}
