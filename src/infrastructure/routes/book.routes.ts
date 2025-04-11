import { Router } from 'express';
import { BookController } from '../controllers/book.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { body } from 'express-validator';
import { validate } from '../middlewares/validation.middleware';

export const createBookRouter = (
  bookController: BookController,
  authMiddleware: AuthMiddleware
): Router => {
  const router = Router();
  
  // Validations
  const createBookValidation = [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required')
  ];

  const updateBookValidation = [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('author').optional().notEmpty().withMessage('Author cannot be empty')
  ];
  
  // Public routes
  router.get('/search', (req, res) => bookController.searchExternal(req, res));
  router.get('/external/:id', (req, res) => bookController.getExternalById(req, res));
  router.get('/', (req, res) => bookController.getAll(req, res));
  router.get('/:id', (req, res) => bookController.getById(req, res));
  
  // Protected routes
  router.use(authMiddleware.authenticate);
  
  router.post('/', validate(createBookValidation), (req, res) => bookController.create(req, res));
  router.get('/user/books', (req, res) => bookController.getByUserId(req, res));
  router.put('/:id', validate(updateBookValidation), (req, res) => bookController.update(req, res));
  router.delete('/:id', (req, res) => bookController.delete(req, res));
  
  return router;
}; 