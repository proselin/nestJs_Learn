import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { execPath } from 'process';
import { JwtService } from '@nestjs/jwt';
import e from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(dto: AuthDTO) {
    // find the user in db
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user does not exsisted throw error
    if (!user) {
      throw new ForbiddenException('Password or email doesnt match!');
    }
    //decrypt password
    const passwordMatch = await argon.verify(user.hash, dto.password);
    // if password does not match throw error
    if (!passwordMatch) {
      throw new ForbiddenException('Password or email doesnt match!');
    }
    // return the token
    return this.signToken(user.id, user.email);
  }

  async register(dto: AuthDTO) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // save new user to the db

    // try catch to throw errors
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },

        // select what show in response
        // select: {
        //     id: true,
        //     email: true,
        // }
      });

      // strip out  a variable in response
      delete user.hash;

      //return the user with email and hash password
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const reset = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: reset,
    });

    return {
      access_token: token,
    };
  }
}
