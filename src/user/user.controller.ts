import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWTGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
  @UseGuards(JWTGuard)
  @Get()
  getUser() {
    return { user: 'hi' };
  }
}
