import UserRepository from 'src/application/repository/user-repository';
import CreateUser from 'src/application/use-cases/create-user';
import User from 'src/domain/user/user';

it('should create a user and persist it', async () => {
  const input = {
    username: 'R',
    email: 'robert@gmail.com',
    password: '12345678',
  };
  const userRepository: UserRepository = {
    getById: jest.fn(
      async () =>
        new User({
          username: 'R',
          email: 'robert@gmail.com',
          password: '12345678',
          createdAt: new Date(),
          id: '',
        }),
    ),
    save: jest.fn(),
    getByEmail: jest.fn(),
  };
  const createUserUsecase = new CreateUser(userRepository);

  const createUserOutput = await createUserUsecase.execute(input);
  // const user = await userRepository.getById(createUserOutput.userId);

  expect(createUserOutput.userId).toBeDefined();
  // expect(user.id).toBe(createUserOutput.userId);
});

it('should not create a user with duplicate email', async () => {
  const input = {
    username: 'R',
    email: 'robert@gmail.com',
    password: '12345678',
  };
  const userRepository: UserRepository = {
    getById: jest.fn(),
    save: jest.fn(),
    getByEmail: jest.fn(
      async () =>
        new User({
          username: 'R',
          email: 'robert@gmail.com',
          password: '12345678',
          createdAt: new Date(),
          id: '',
        }),
    ),
  };
  const createUserUsecase = new CreateUser(userRepository);

  // await createUserUsecase.execute(input);

  await expect(createUserUsecase.execute(input)).rejects.toThrow(
    'Duplicated email',
  );
});
