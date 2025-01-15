import {
  Controller,
  Post,
  Patch,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Users') // Adiciona a tag na documentação do Swagger
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Cadastrar um novo usuário' })
  @ApiBody({
    description: 'Dados para criação de um novo usuário',
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'novoUsuario' },
        password: { type: 'string', example: 'senha123' },
      },
      required: ['username', 'password'],
    },
  })
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    if (!username || !password) {
      throw new BadRequestException('Username e password são obrigatórios');
    }

    try {
      const newUser = await this.userService.createUser(username, password);
      return {
        message: 'Usuário cadastrado com sucesso',
        user: { id: newUser.id, username: newUser.username },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch('change-password')
  @ApiOperation({ summary: 'Alterar a senha de um usuário existente' })
  @ApiBody({
    description: 'Dados necessários para alterar a senha',
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'testuser' },
        currentPassword: { type: 'string', example: 'senhaAtual123' },
        newPassword: { type: 'string', example: 'novaSenha123' },
      },
      required: ['username', 'currentPassword', 'newPassword'],
    },
  })
  async changePassword(
    @Body('username') username: string,
    @Body('currentPassword') currentPassword: string,
    @Body('newPassword') newPassword: string,
  ) {
    if (!username || !currentPassword || !newPassword) {
      throw new BadRequestException('Todos os campos são obrigatórios');
    }

    try {
      await this.userService.updatePassword(
        username,
        currentPassword,
        newPassword,
      );
      return { message: 'Senha alterada com sucesso' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
