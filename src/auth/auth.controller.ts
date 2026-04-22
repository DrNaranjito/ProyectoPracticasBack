import { Body, Controller, Post, Get, UseGuards,Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {

    constructor(
    private readonly authService : AuthService,
    ) {}

    @Post('login')
    login(
        @Body()
        loginDto :  loginDto
    ){
        return this.authService.login(loginDto)
}

    @Post('register')
    register(
        @Body()
        registerDto :  registerDto
    ){
        return this.authService.register(registerDto)

}

 @ApiBearerAuth()
 @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

    

}
