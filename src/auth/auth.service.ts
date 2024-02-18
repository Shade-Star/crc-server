import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { config } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(createAuthDto: AuthDto) {
    const hash = await argon.hash(createAuthDto.password);
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: createAuthDto.email,
          hash: hash,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Email already exists');
      }
      throw error;
    }
  }

  async signin(authDto: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }
    const pwdMatch = await argon.verify(user.hash, authDto.password);
    if (!pwdMatch) {
      throw new ForbiddenException('Invalid credentials');
    }
    return this.signToken(user.id, user.email);
  }

  signToken(userId: string, email: string) {
    const payload = { sub: userId, email: email };
    const token = this.jwt.sign(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: '1d',
    });
    return {
      access_token: token,
    };
  }
}
