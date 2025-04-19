import { User } from '../../../domain/entities/user.entity';
import { UserRegisterDto, UserDto } from '../../../application/dtos/user.dto';
import { UserRepository } from '../../../domain/repositories/user-repository.interface';
import { UserMapper } from '../../../application/mappers/user.mapper';

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
    
    const userEntity = UserMapper.toEntity(userData);
    
    const user = await this.userRepository.create(userEntity);
    
    return UserMapper.toDto(user);
  }
} 