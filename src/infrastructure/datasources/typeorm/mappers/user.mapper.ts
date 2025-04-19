import { User } from '../../../../domain/entities/user.entity';
import { UserModel } from '../models/user.model';

export class UserMapper {
  /**
   * Maps a domain User entity to a TypeORM UserModel
   */
  static toPersistence(domainUser: User): Partial<UserModel> {
    return {
      id: domainUser.id,
      name: domainUser.name,
      email: domainUser.email,
      password: domainUser.password,
      role: domainUser.role,
      createdAt: domainUser.createdAt,
      updatedAt: domainUser.updatedAt
    };
  }

  /**
   * Maps a TypeORM UserModel to a domain User entity
   */
  static toDomain(userModel: UserModel): User {
    return new User(
      userModel.id,
      userModel.name,
      userModel.email,
      userModel.password,
      userModel.role,
      userModel.createdAt,
      userModel.updatedAt
    );
  }
} 