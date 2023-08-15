import * as crypto from 'crypto';
import User from 'src/domain/user/user';

it('should create a user', async () => {
  const user = await User.create({
    email: 'robert@gmail.com',
    password: '12345678',
    username: 'R',
  });

  expect(user).toBeInstanceOf(User);
});

it('should create a user with UUID', async () => {
  const REGEX_TO_TEST_UUID =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

  const user = await User.create({
    email: 'robert@gmail.com',
    password: '12345678',
    username: 'R',
  });

  expect(REGEX_TO_TEST_UUID.test(user.id)).toBe(true);
});

it('should create a user with hashed password', async () => {
  const PASSWORD = '12345678';

  const user = await User.create({
    email: 'robert@gmail.com',
    password: PASSWORD,
    username: 'R',
  });

  expect(user['password']).not.toEqual(PASSWORD);
});

it('should create a user with createdAt', async () => {
  const user = await User.create({
    email: 'robert@gmail.com',
    password: '12345678',
    username: 'R',
  });

  expect(user.createdAt).toBeInstanceOf(Date);
});

it('should restore a user correctly', async () => {
  const USER_DATA = {
    username: 'R',
    password: '12345678',
    createdAt: new Date(),
    id: crypto.randomUUID(),
    email: 'robert@gmail.com',
  };

  const user = new User(USER_DATA);

  expect(user.id).toBe(USER_DATA.id);
  expect(user.email.value).toBe(USER_DATA.email);
  expect(user.username).toBe(USER_DATA.username);
  expect(user.createdAt).toBe(USER_DATA.createdAt);
});

it('should return true to correct password', async () => {
  const PASSWORD = '12345678';

  const user = await User.create({
    username: 'R',
    password: PASSWORD,
    email: 'robert@gmail.com',
  });

  await expect(user.validatePassword(PASSWORD)).resolves.toBe(true);
});

it('should return false to incorrect password', async () => {
  const PASSWORD = '12345678';

  const user = new User({
    username: 'R',
    password: PASSWORD,
    createdAt: new Date(),
    id: crypto.randomUUID(),
    email: 'robert@gmail.com',
  });

  await expect(user.validatePassword('123')).resolves.toBe(false);
});
