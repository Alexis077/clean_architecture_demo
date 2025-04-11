import { UserModel, UserRegisterDto } from '../models/user.model';

export interface UserRepository {
  findById(id: string): Promise<UserModel | null>;
  findByEmail(email: string): Promise<UserModel | null>;
  create(user: UserRegisterDto): Promise<UserModel>;
  update(id: string, user: Partial<UserModel>): Promise<UserModel | null>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<UserModel[]>;
} 