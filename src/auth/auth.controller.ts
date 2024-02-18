import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() createAuthDto: AuthDto) {
    return this.authService.signin(createAuthDto);
  }
  @Post('signup')
  signup(@Body() createAuthDto: AuthDto) {
    return this.authService.signup(createAuthDto);
  }
}
