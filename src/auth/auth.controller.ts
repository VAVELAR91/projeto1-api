import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { CredentialsCreateDto } from './dto/credentialsCreate.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth') // Agrupa os endpoints no Swagger
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: 'Realiza o login de um usuário' })
  @ApiBody({
    description: 'Credenciais do usuário para login',
    type: CredentialsDto,
  })
  @ApiResponse({ status: 200, description: 'Login bem-sucedido' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async signIn(@Body() credentials: CredentialsDto) {
    return await this.authService.signIn(credentials);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Cria uma nova conta de usuário' })
  @ApiBody({
    description: 'Credenciais do usuário para criação de conta',
    type: CredentialsCreateDto,
  })
  @ApiResponse({ status: 201, description: 'Conta criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao criar a conta' })
  async signUp(@Body() credentials: CredentialsCreateDto) {
    return await this.authService.signUp(credentials);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtém os dados do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Dados do usuário autenticado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  getProfile() {
    return { message: 'Dados do usuário autenticado' };
  }
}
