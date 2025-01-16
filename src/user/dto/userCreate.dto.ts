import { OmitType } from '@nestjs/mapped-types';
import { UserDTO } from './user.dto';

export class UserCreateDTO extends OmitType(UserDTO, ['id']) {}
