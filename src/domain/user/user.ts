import * as crypto from 'crypto';
import Email from './email';
import Password from './password';

interface UserAttributes {
  id: string;
  email: Email;
  password: Password;
  username: string;
  createdAt: Date;
}

interface RawUserAttributes {
  id: string;
  email: string;
  password: string;
  username: string;
  createdAt: Date;
}

interface CreateUserParams {
  email: string;
  username: string;
  password: string;
}

export default class User {
  readonly id: UserAttributes['id'];
  readonly email: UserAttributes['email'];
  readonly createdAt: UserAttributes['createdAt'];
  readonly username: UserAttributes['username'];

  private readonly password: UserAttributes['password'];

  constructor(attributes: RawUserAttributes) {
    this.id = attributes.id;
    this.email = new Email(attributes.email);
    this.password = new Password(attributes.password);
    this.username = attributes.username;
    this.createdAt = attributes.createdAt;
  }

  static async create({
    email,
    password: rawPassword,
    username,
  }: CreateUserParams) {
    const uuid = crypto.randomUUID();
    const password = await Password.create(rawPassword);

    return new User({
      email,
      username,
      id: uuid,
      password: password.value,
      createdAt: new Date(),
    });
  }

  async validatePassword(passwordToValidate: string): Promise<boolean> {
    const isValid = await this.password.isSamePassword(passwordToValidate);
    return isValid;
  }

  getPassword() {
    return this.password.value;
  }
}
