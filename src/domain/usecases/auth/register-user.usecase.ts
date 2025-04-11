import { UserModel, UserRegisterDto, UserDto } from '../../models/user.model';
import { UserRepository } from '../../repositories/user-repository.interface';

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