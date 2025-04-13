import { User } from '../../../domain/entities/user.entity';
import { UserRegisterDto, UserDto } from '../../../domain/dtos/user.dto';
import { UserRepository } from '../../../domain/repositories/user-repository.interface';

export interface RegisterUserUseCase {
  execute(userData: UserRegisterDto): Promise<UserDto>;
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userData: UserRegisterDto): Promise<UserDto> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    const user = await this.userRepository.create(userData);
    
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
  }
} 