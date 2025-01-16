import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserCreateDTO } from './dto/userCreate.dto';
import { UserUpdateDTO } from './dto/userUpdate.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findAll() {
    return this.userRepository.find();
  }

  async findOneByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (!user) {
      throw new NotFoundException(`User Username ${username} not found`);
    }
    return user;
  }

  async findOneById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User ID ${id} not found`);
    }
    delete user.password;
    return user;
  }

  async create(userData: UserCreateDTO): Promise<User> {
    let user = await this.userRepository.findOne({
      where: { username: userData.username },
    });
    if (user) {
      throw new NotFoundException(`User ${userData.username} already exists`);
    }

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(userData.password, saltRounds);

    user = this.userRepository.create({
      ...userData,
      password: hashedNewPassword,
    });

    await this.userRepository.save(user);

    return user;
  }

  async update(id: string, userData: UserUpdateDTO): Promise<User> {
    const user = await this.userRepository.preload({
      id,
      ...userData,
    });
    if (!user) {
      throw new NotFoundException(`User ID ${id} not found`);
    }
    return this.userRepository.save(user);
  }

  async updatePassword(
    id: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<User> {
    const user = await this.userRepository.preload({
      id,
    });
    if (!user) {
      throw new NotFoundException(`User ID ${id} not found`);
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      throw new NotFoundException('The password is currently incorrect');
    }

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    this.userRepository.save({ ...user, password: hashedNewPassword });

    return user;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User ID ${id} not found`);
    }
    return this.userRepository.remove(user);
  }
}
