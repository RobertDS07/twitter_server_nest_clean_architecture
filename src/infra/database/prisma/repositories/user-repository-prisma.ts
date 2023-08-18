import UserRepository from 'src/application/repository/user-repository';
import PrismaService from '../prisma.service';
import User from 'src/domain/user/user';

export default class UserRepositoryPrisma implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(user: User): Promise<void> {
    await this.prismaService.user.create({
      data: {
        id: user.id,
        email: user.email.value,
        password: user.getPassword(),
        username: user.username,
        createdAt: user.createdAt,
      },
    });
  }

  async getById(id: string): Promise<User> {
    const userFromDatabase = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!userFromDatabase) return null;

    return new User({
      id: userFromDatabase.id,
      email: userFromDatabase.email,
      password: userFromDatabase.password,
      username: userFromDatabase.username,
      createdAt: userFromDatabase.createdAt,
    });
  }

  async getByEmail(email: string): Promise<User> {
    const userFromDatabase = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!userFromDatabase) return null;

    return new User({
      id: userFromDatabase.id,
      email: userFromDatabase.email,
      password: userFromDatabase.password,
      username: userFromDatabase.username,
      createdAt: userFromDatabase.createdAt,
    });
  }
}
