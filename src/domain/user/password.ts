import * as bcrypt from 'bcryptjs';

export default class Password {
  constructor(readonly value: string) {}

  static async create(value: string): Promise<Password> {
    const isValid = this.validate(value);
    if (!isValid) throw new Error('Weak password');

    const encryptedPassword = await bcrypt.hash(value, 6);
    return new Password(encryptedPassword);
  }

  private static validate(value: string): boolean {
    const isValid = value.length >= 8;
    return isValid;
  }

  async isSamePassword(rawPassword): Promise<boolean> {
    const isSame = await bcrypt.compare(rawPassword, this.value);
    return isSame;
  }
}
