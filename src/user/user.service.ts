import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(username: string, plainPassword: string) {
    // Verifica se o nome de usuário já existe
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new Error('Usuário já existe');
    }

    // Criptografa a senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    // Cria e salva o novo usuário
    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }

  async updatePassword(
    username: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verifica se a senha atual está correta
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error('Senha atual está incorreta');
    }

    // Criptografa a nova senha
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Atualiza a senha do usuário
    user.password = hashedNewPassword;
    return this.userRepository.save(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
}
