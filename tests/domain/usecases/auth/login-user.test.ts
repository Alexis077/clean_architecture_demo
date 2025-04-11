import { LoginUser } from '../../../../src/domain/usecases/auth/login-user.usecase';
import { UserRepository } from '../../../../src/domain/repositories/user-repository.interface';
import { PasswordHasher } from '../../../../src/domain/services/password-hasher.interface';
import { TokenGenerator, TokenPayload } from '../../../../src/domain/services/token-generator.interface';
import { UserLoginDto, UserModel } from '../../../../src/domain/models/user.model';

describe('LoginUser UseCase', () => {
  let loginUser: LoginUser;
  let mockUserRepository: jest.Mocked<UserRepository>;
  let mockPasswordHasher: jest.Mocked<PasswordHasher>;
  let mockTokenGenerator: jest.Mocked<TokenGenerator>;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn()
    } as jest.Mocked<UserRepository>;

    mockPasswordHasher = {
      hash: jest.fn(),
      compare: jest.fn()
    } as jest.Mocked<PasswordHasher>;

    mockTokenGenerator = {
      generate: jest.fn(),
      verify: jest.fn()
    } as jest.Mocked<TokenGenerator>;

    loginUser = new LoginUser(
      mockUserRepository,
      mockPasswordHasher,
      mockTokenGenerator
    );
  });

  it('should successfully login a user with valid credentials', async () => {
    // Arrange
    const loginDto: UserLoginDto = {
      email: 'test@example.com',
      password: 'password123'
    };

    const user: UserModel = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashed_password',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const tokenPayload: TokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    const generatedToken = 'generated_jwt_token';

    mockUserRepository.findByEmail.mockResolvedValue(user);
    mockPasswordHasher.compare.mockResolvedValue(true);
    mockTokenGenerator.generate.mockReturnValue(generatedToken);

    // Act
    const result = await loginUser.execute(loginDto);

    // Assert
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(loginDto.email);
    expect(mockPasswordHasher.compare).toHaveBeenCalledWith(loginDto.password, user.password);
    expect(mockTokenGenerator.generate).toHaveBeenCalledWith(tokenPayload);
    
    expect(result).toEqual({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generatedToken
    });
  });

  it('should throw an error if user not found', async () => {
    // Arrange
    const loginDto: UserLoginDto = {
      email: 'nonexistent@example.com',
      password: 'password123'
    };

    mockUserRepository.findByEmail.mockResolvedValue(null);

    // Act & Assert
    await expect(loginUser.execute(loginDto)).rejects.toThrow('Invalid credentials');
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(loginDto.email);
    expect(mockPasswordHasher.compare).not.toHaveBeenCalled();
    expect(mockTokenGenerator.generate).not.toHaveBeenCalled();
  });

  it('should throw an error if password is invalid', async () => {
    // Arrange
    const loginDto: UserLoginDto = {
      email: 'test@example.com',
      password: 'wrong_password'
    };

    const user: UserModel = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashed_password',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockUserRepository.findByEmail.mockResolvedValue(user);
    mockPasswordHasher.compare.mockResolvedValue(false);

    // Act & Assert
    await expect(loginUser.execute(loginDto)).rejects.toThrow('Invalid credentials');
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(loginDto.email);
    expect(mockPasswordHasher.compare).toHaveBeenCalledWith(loginDto.password, user.password);
    expect(mockTokenGenerator.generate).not.toHaveBeenCalled();
  });
}); 