import { Module } from '@nestjs/common';
import PrismaService from './prisma/prisma.service';
import UserRepository from 'src/application/repository/user-repository';
import UserRepositoryPrisma from './prisma/repositories/user-repository-prisma';

@Module({
  providers: [PrismaService, UserRepositoryPrisma],
  exports: [
    {
      provide: UserRepository,
      useClass: UserRepositoryPrisma,
    },
  ],
})
export default class DatabaseModule {}
