import { v4 as uuidv4 } from 'uuid';
import { User } from '../../domain/entities/user.entity';
import { UserRegisterDto, UserDto } from '../dtos/user.dto';

export class UserMapper {
  /**
   * Mapea un DTO de registro a una entidad de dominio User
   */
  static toEntity(userRegisterDto: UserRegisterDto): User {
    const now = new Date();
    
    return new User(
      uuidv4(), // generar un ID único
      userRegisterDto.name,
      userRegisterDto.email,
      userRegisterDto.password,
      'user', // role por defecto
      now,    // createdAt
      now     // updatedAt
    );
  }

  /**
   * Mapea una entidad User a un DTO para respuesta
   */
  static toDto(user: User): UserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
  }
} 