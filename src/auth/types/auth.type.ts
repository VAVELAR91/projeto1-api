import { UserResponseDTO } from 'src/user/dto/userResponse.dto';

export interface AuthUser extends UserResponseDTO {
  sub?: string;
}
