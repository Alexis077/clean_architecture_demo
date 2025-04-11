import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserModel, UserRegisterDto } from '../../../../domain/models/user.model';
import { UserRepository } from '../../../../domain/repositories/user-repository.interface';
import { AppDataSource } from '../../../../config/database';
import { PasswordHasher } from '../../../../domain/services/password-hasher.interface';

export class TypeOrmUserRepository implements UserRepository {
  private repository: Repository<UserEntity>;
  
  constructor(private readonly passwordHasher: PasswordHasher) {
    this.repository = AppDataSource.getRepository(UserEntity);
  }
  
  async findById(id: string): Promise<UserModel | null> {
    const user = await this.repository.findOne({ where: { id } });
    return user ? user : null;
  }
  
  async findByEmail(email: string): Promise<UserModel | null> {
    const user = await this.repository.findOne({ where: { email } });
    return user ? user : null;
  }
  
  async create(userData: UserRegisterDto): Promise<UserModel> {
    const hashedPassword = await this.passwordHasher.hash(userData.password);
    
    const user = this.repository.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: 'user'
    });
    
    return this.repository.save(user);
  }
  
  async update(id: string, userData: Partial<UserModel>): Promise<UserModel | null> {
    const user = await this.findById(id);
    
    if (!user) {
      return null;
    }
    
    if (userData.password) {
      userData.password = await this.passwordHasher.hash(userData.password);
    }
    
    await this.repository.update(id, userData);
    return this.findById(id);
  }
  
  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
  
  async findAll(): Promise<UserModel[]> {
    return this.repository.find();
  }
} 