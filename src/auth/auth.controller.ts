import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Body() createAuthDto: AuthDto, @Res() res: Response) {
    const result = await this.authService.signin(createAuthDto);
    return res.status(HttpStatus.OK).json(result);
  }
  @Post('signup')
  signup(@Body() createAuthDto: AuthDto) {
    return this.authService.signup(createAuthDto);
  }
}
