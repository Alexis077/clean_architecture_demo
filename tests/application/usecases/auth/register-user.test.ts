import { RegisterUser } from '../../../../src/application/usecases/auth/register-user.usecase';
import { UserRepository } from '../../../../src/domain/repositories/user-repository.interface';
import { UserRegisterDto } from '../../../../src/domain/dtos/user.dto';
import { User } from '../../../../src/domain/entities/user.entity';

describe('RegisterUser UseCase', () => {
  let registerUser: RegisterUser;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      getAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn()
    } as jest.Mocked<UserRepository>;

    registerUser = new RegisterUser(mockUserRepository);
  });

  it('should successfully register a new user', async () => {
    // Arrange
    const userData: UserRegisterDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };

    const createdUser: User = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashed_password',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.create.mockResolvedValue(createdUser);

    // Act
    const result = await registerUser.execute(userData);

    // Assert
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(mockUserRepository.create).toHaveBeenCalledWith(userData);
    expect(result).toEqual({
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role
    });
  });

  it('should throw an error if the user already exists', async () => {
    // Arrange
    const userData: UserRegisterDto = {
      name: 'Test User',
      email: 'existing@example.com',
      password: 'password123'
    };

    const existingUser: User = {
      id: '1',
      name: 'Existing User',
      email: 'existing@example.com',
      password: 'hashed_password',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockUserRepository.findByEmail.mockResolvedValue(existingUser);

    // Act & Assert
    await expect(registerUser.execute(userData)).rejects.toThrow('User with this email already exists');
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(mockUserRepository.create).not.toHaveBeenCalled();
  });
}); 