import { UserLoginDto, UserWithToken } from '../../../domain/dtos/user.dto';
import { UserRepository } from '../../../domain/repositories/user-repository.interface';
import { PasswordHasher } from '../../services/password-hasher.interface';
import { TokenGenerator } from '../../services/token-generator.interface';

export interface LoginUserUseCase {
  execute(credentials: UserLoginDto): Promise<UserWithToken>;
}

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async execute(credentials: UserLoginDto): Promise<UserWithToken> {
    const user = await this.userRepository.findByEmail(credentials.email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const isPasswordValid = await this.passwordHasher.compare(credentials.password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    
    const token = this.tokenGenerator.generate({
      id: user.id,
      email: user.email,
      role: user.role
    });
    
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    };
  }
} 