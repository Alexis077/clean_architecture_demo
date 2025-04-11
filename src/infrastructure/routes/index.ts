import { Router } from 'express';
import { createAuthRouter } from './auth.routes';
import { createBookRouter } from './book.routes';
import { AuthController } from '../controllers/auth.controller';
import { BookController } from '../controllers/book.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export const createRouter = (
  authController: AuthController,
  bookController: BookController,
  authMiddleware: AuthMiddleware
): Router => {
  const router = Router();
  
  // API Routes
  router.use('/api/auth', createAuthRouter(authController));
  router.use('/api/books', createBookRouter(bookController, authMiddleware));
  
  // Health check
  router.get('/health', (_, res) => {
    res.status(200).json({ status: 'ok' });
  });
  
  return router;
}; 