import { Request, Response, NextFunction } from 'express';
import { TokenGenerator } from '../../application/services/token-generator.interface';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export class AuthMiddleware {
  constructor(private readonly tokenGenerator: TokenGenerator) {}

  authenticate = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader) {
        res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
        return;
      }
      
      const token = authHeader.split(' ')[1];
      
      if (!token) {
        res.status(401).json({
          success: false,
          message: 'Invalid token format'
        });
        return;
      }
      
      const decoded = this.tokenGenerator.verify(token);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
  };

  authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required'
      });
    }
  };
} 