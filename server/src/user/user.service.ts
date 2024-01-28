import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: UserDto) {
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: dto.password,
        waketime: dto.waketime,
      },
    });

    return user;
  }
}
