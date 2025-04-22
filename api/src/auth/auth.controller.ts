import { Body, Controller, Post } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: "Login user" })  
  sigIn(@Body() body: SigninDto) {
    return this.authService.signin(body)
  }
}
