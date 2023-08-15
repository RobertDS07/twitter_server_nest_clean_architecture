import Email from 'src/domain/user/email';

it('should create a email', () => {
  const EMAIL_STRING = 'robert@gmail.com';

  const email = new Email(EMAIL_STRING);

  expect(email.value).toBe(EMAIL_STRING);
});

it('should throw error to invalid emal', () => {
  expect(() => new Email('sadasd')).toThrow('Invalid email');
});
