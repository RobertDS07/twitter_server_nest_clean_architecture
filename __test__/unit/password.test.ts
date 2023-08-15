import Password from 'src/domain/user/password';

it('should create a encrypted password', async () => {
  const value = '12345678';

  const password = await Password.create(value);

  expect(password.value).not.toEqual(value);
});

it('should throw error when is weak password (min 8 characters)', async () => {
  const value = '1234567';

  await expect(() => Password.create(value)).rejects.toThrow('Weak password');
});

it('should return false when validate password is wrong', async () => {
  const value = '12345678';
  const password = await Password.create(value);

  const isSamePassword = await password.isSamePassword('other-password');

  expect(isSamePassword).toBe(false);
});

it('should return false when validate password is correct', async () => {
  const value = '12345678';
  const password = await Password.create(value);

  const isSamePassword = await password.isSamePassword(value);

  expect(isSamePassword).toBe(true);
});
