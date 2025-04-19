import { Repository } from 'typeorm';
import { UserModel } from '../models/user.model';
import { User } from '../../../../domain/entities/user.entity';
import { UserRegisterDto } from '../../../../application/dtos/user.dto';
import { UserRepository } from '../../../../domain/repositories/user-repository.interface';
import { AppDataSource } from '../../../../config/database';
import { PasswordHasher } from '../../../../application/services/password-hasher.interface';
import { UserMapper } from '../mappers/user.mapper';

export class TypeOrmUserRepository implements UserRepository {
  private repository: Repository<UserModel>;
  
  constructor(private readonly passwordHasher: PasswordHasher) {
    this.repository = AppDataSource.getRepository(UserModel);
  }
  
  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id } });
    return user ? UserMapper.toDomain(user) : null;
  }
  
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { email } });
    return user ? UserMapper.toDomain(user) : null;
  }
  
  async create(userData: User): Promise<User> {
    const hashedPassword = await this.passwordHasher.hash(userData.password);
    
    // Create a copy of userData with hashed password
    const userDataWithHashedPassword = {
      ...userData,
      password: hashedPassword
    };
    
    const userModel = this.repository.create(UserMapper.toPersistence(userDataWithHashedPassword));
    const savedUser = await this.repository.save(userModel);
    return UserMapper.toDomain(savedUser);
  }
  
  async update(id: string, userData: User): Promise<User | null> {
    const user = await this.findById(id);
    
    if (!user) {
      return null;
    }
    
    // Hash password if provided
    if (userData.password) {
      userData.password = await this.passwordHasher.hash(userData.password);
    }
    
    const userModelData = UserMapper.toPersistence(userData);
    await this.repository.update(id, userModelData);
    
    const updatedUser = await this.repository.findOne({ where: { id } });
    return updatedUser ? UserMapper.toDomain(updatedUser) : null;
  }
  
  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
  
  async findAll(): Promise<User[]> {
    const users = await this.repository.find();
    return users.map(user => UserMapper.toDomain(user));
  }
} 