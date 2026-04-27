import {
    Body, Controller, Post, Get, UseGuards, Req
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }



    @Post('login')
    @ApiOperation({ summary: 'Iniciar sesión y obtener un token JWT' })
    login(@Body() loginDto: loginDto) {
        return this.authService.login(loginDto);
    }


    @Post('register')
    @ApiOperation({ summary: 'Registrar un nuevo usuario' })
    register(@Body() registerDto: registerDto) {
        return this.authService.register(registerDto);
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('profile')
    @ApiOperation({ summary: 'Obtener el perfil del usuario autenticado' })
    getProfile(@Req() req) {
        return this.authService.getProfile(req.user);
    }
}
