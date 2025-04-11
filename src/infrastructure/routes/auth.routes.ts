import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { body } from 'express-validator';
import { validate } from '../middlewares/validation.middleware';

export const createAuthRouter = (authController: AuthController): Router => {
  const router = Router();

  // Validations
  const registerValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ];

  const loginValidation = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ];

  // Routes
  router.post('/register', validate(registerValidation), (req, res) => authController.register(req, res));
  router.post('/login', validate(loginValidation), (req, res) => authController.login(req, res));

  return router;
}; 