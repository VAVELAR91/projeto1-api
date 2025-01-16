import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreateDTO } from './dto/userCreate.dto';
import { UserUpdateDTO } from './dto/userUpdate.dto';
import {
  UserSwaggerPost,
  UserSwaggerPut,
  UserSwaggerResponse,
} from './swagger/user';
import { UserService } from './user.service';

@ApiTags('Users') // Adiciona a tag na documentação do Swagger
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos os usuários',
    description:
      'Retorna uma lista de todos os usuários cadastrados no sistema.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso.',
    type: [UserSwaggerResponse],
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar usuário por ID',
    description:
      'Retorna os dados de um usuário específico com base no ID fornecido.',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado com sucesso.',
    type: UserSwaggerResponse,
  })
  findOneById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Get(':username/exist')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Verificar existência de usuário',
    description:
      'Verifica se um usuário com o username informado existe no sistema.',
  })
  @ApiResponse({ status: 204, description: 'Usuário encontrado.' })
  findOneByUsername(@Param('username') username: string) {
    return this.userService.findOneByUsername(username);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar um novo usuário',
    description: 'Cria um novo usuário no sistema com os dados fornecidos.',
  })
  @ApiBody({
    description: 'Dados para criação de um novo usuário',
    type: UserSwaggerPost,
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário criado com sucesso.',
    type: UserSwaggerResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos para criação do usuário.',
  })
  create(@Body() userData: UserCreateDTO) {
    return this.userService.create(userData);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar dados do usuário',
    description:
      'Atualiza os dados de um usuário existente com base no ID informado.',
  })
  @ApiBody({
    description: 'Dados para atualização do usuário',
    type: UserSwaggerPut,
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso.',
    type: UserSwaggerResponse,
  })
  update(
    @Param('id') id: string,
    @Body() userData: Omit<UserUpdateDTO, 'password'>,
  ) {
    return this.userService.update(id, userData);
  }

  @Put(':id/change-password')
  @ApiOperation({
    summary: 'Alterar a senha de um usuário',
    description:
      'Altera a senha de um usuário existente, verificando a senha atual antes da alteração.',
  })
  @ApiBody({
    description: 'Dados necessários para alterar a senha',
    schema: {
      type: 'object',
      properties: {
        currentPassword: { type: 'string', example: 'senha_atual' },
        newPassword: { type: 'string', example: 'senha_nova' },
      },
      required: ['currentPassword', 'newPassword'],
    },
  })
  @ApiResponse({ status: 200, description: 'Senha alterada com sucesso.' })
  updatePassword(
    @Param('id') id: string,
    @Body() body: { currentPassword: string; newPassword: string },
  ) {
    return this.userService.updatePassword(
      id,
      body.currentPassword,
      body.newPassword,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Excluir um usuário',
    description: 'Remove um usuário do sistema com base no ID informado.',
  })
  @ApiResponse({ status: 200, description: 'Usuário excluído com sucesso.' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
