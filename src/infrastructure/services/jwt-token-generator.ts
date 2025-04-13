import * as jwt from 'jsonwebtoken';
import { TokenGenerator, TokenPayload } from '../../application/services/token-generator.interface';
import { config } from '../../config/env';

export class JwtTokenGenerator implements TokenGenerator {
  generate(payload: TokenPayload): string {
    // @ts-ignore
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn
    });
  }
  
  verify(token: string): TokenPayload {
    try {
      // @ts-ignore
      return jwt.verify(token, config.jwt.secret) as TokenPayload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
} 