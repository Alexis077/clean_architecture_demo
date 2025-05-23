import bcrypt from 'bcrypt';
import { PasswordHasher } from '../../application/services/password-hasher.interface';

export class BcryptPasswordHasher implements PasswordHasher {
  private readonly saltRounds = 10;
  
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }
  
  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
} 