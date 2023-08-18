import DuplicatedEmailError from 'src/domain/errors/duplicated-email';
import UserRepository from '../repository/user-repository';
import User from 'src/domain/user/user';

interface Input {
  username: string;
  email: string;
  password: string;
}

interface Output {
  userId: string;
}

export default class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<Output> {
    const userWithThisEmail = this.userRepository.getByEmail(input.email);
    if (userWithThisEmail) {
      throw new DuplicatedEmailError('Duplicated email');
    }

    const user = await User.create({
      email: input.email,
      password: input.password,
      username: input.password,
    });
    await this.userRepository.save(user);

    return {
      userId: user.id,
    };
  }
}
