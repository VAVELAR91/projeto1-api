import { User } from 'src/user/entities/user.entity';

export interface AuthUser extends Omit<User, 'password'> {
  sub?: string;
}
