import { Body, Controller, Post } from '@nestjs/common';
import CreateUser from 'src/application/use-cases/create-user';

@Controller('users')
export default class UserController {
  constructor(private readonly createUserUseCase: CreateUser) {}

  @Post()
  async createUser(@Body() body: any) {}
}
