import User from 'src/domain/user/user';

export default abstract class UserRepository {
  abstract save(user: User): Promise<void>;
  abstract getById(id: string): Promise<User | null>;
  abstract getByEmail(email: string): Promise<User | null>;
}
