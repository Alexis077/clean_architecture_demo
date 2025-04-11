import bcrypt from 'bcrypt';
import { BcryptPasswordHasher } from '../../../src/infrastructure/services/bcrypt-password-hasher';

// Mock de bcrypt
jest.mock('bcrypt');

describe('BcryptPasswordHasher', () => {
  let passwordHasher: BcryptPasswordHasher;

  beforeEach(() => {
    passwordHasher = new BcryptPasswordHasher();
    jest.clearAllMocks();
  });

  describe('hash', () => {
    it('should hash a password using bcrypt with correct salt rounds', async () => {
      // Arrange
      const password = 'test_password';
      const hashedPassword = 'hashed_password';
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      // Act
      const result = await passwordHasher.hash(password);

      // Assert
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(result).toBe(hashedPassword);
    });
  });

  describe('compare', () => {
    it('should return true when comparing a password with its correct hash', async () => {
      // Arrange
      const password = 'test_password';
      const hashedPassword = 'hashed_password';
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      // Act
      const result = await passwordHasher.compare(password, hashedPassword);

      // Assert
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toBe(true);
    });

    it('should return false when comparing a password with an incorrect hash', async () => {
      // Arrange
      const password = 'wrong_password';
      const hashedPassword = 'hashed_password';
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      // Act
      const result = await passwordHasher.compare(password, hashedPassword);

      // Assert
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toBe(false);
    });
  });
}); 