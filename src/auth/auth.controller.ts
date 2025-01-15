import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard'; // Substitua pelo caminho correto

@ApiTags('Auth') // Agrupa os endpoints no Swagger
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realiza o login de um usuário' })
  @ApiBody({
    description: 'Credenciais do usuário para login',
    type: LoginDto,
  })
  @ApiResponse({ status: 201, description: 'Login bem-sucedido' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    return this.authService.login(user); // Retorna o token JWT
  }

  @Get('me')
  @UseGuards(JwtAuthGuard) // Protege o endpoint com o JwtAuthGuard
  @ApiBearerAuth() // Informa ao Swagger que este endpoint exige autenticação
  @ApiOperation({ summary: 'Obtém os dados do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Dados do usuário autenticado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  getProfile() {
    return { message: 'Esse é um endpoint protegido' };
  }
}
