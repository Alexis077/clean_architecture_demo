import * as jwt from 'jsonwebtoken';
import { JwtTokenGenerator } from '../../../src/infrastructure/services/jwt-token-generator';
import { TokenPayload } from '../../../src/domain/services/token-generator.interface';
import { config } from '../../../src/config/env';

// Mock de jsonwebtoken
jest.mock('jsonwebtoken');

describe('JwtTokenGenerator', () => {
  let tokenGenerator: JwtTokenGenerator;
  let mockPayload: TokenPayload;

  beforeEach(() => {
    tokenGenerator = new JwtTokenGenerator();
    mockPayload = {
      id: 'user-123',
      email: 'test@example.com',
      role: 'user'
    };

    // Limpiar todos los mocks
    jest.clearAllMocks();
  });

  describe('generate', () => {
    it('should generate a JWT token with the correct payload and options', () => {
      // Arrange
      const mockToken = 'mock.jwt.token';
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      // Act
      const result = tokenGenerator.generate(mockPayload);

      // Assert
      expect(jwt.sign).toHaveBeenCalledWith(
        mockPayload,
        expect.any(String),
        { expiresIn: expect.any(String) }
      );
      expect(result).toBe(mockToken);
    });
  });

  describe('verify', () => {
    it('should verify a token and return the payload', () => {
      // Arrange
      const mockToken = 'valid.jwt.token';
      (jwt.verify as jest.Mock).mockReturnValue(mockPayload);

      // Act
      const result = tokenGenerator.verify(mockToken);

      // Assert
      expect(jwt.verify).toHaveBeenCalledWith(mockToken, expect.any(String));
      expect(result).toEqual(mockPayload);
    });

    it('should throw an error if token verification fails', () => {
      // Arrange
      const mockToken = 'invalid.jwt.token';
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('JWT error');
      });

      // Act & Assert
      expect(() => tokenGenerator.verify(mockToken)).toThrow('Invalid token');
      expect(jwt.verify).toHaveBeenCalledWith(mockToken, expect.any(String));
    });
  });
}); 