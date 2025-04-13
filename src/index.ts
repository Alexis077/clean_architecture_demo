import 'reflect-metadata';
import { initializeDatabase } from './config/database';
import { Server } from './infrastructure/server';
import { createRouter } from './infrastructure/routes';

// Repositories
import { TypeOrmUserRepository } from './infrastructure/datasources/typeorm/repositories/user.repository';
import { TypeOrmBookRepository } from './infrastructure/datasources/typeorm/repositories/book.repository';

// Services
import { BcryptPasswordHasher } from './infrastructure/services/bcrypt-password-hasher';
import { JwtTokenGenerator } from './infrastructure/services/jwt-token-generator';
import { GoogleBooksApiService } from './infrastructure/external-services/google-books-api.service';

// Use cases
import { RegisterUser } from './application/usecases/auth/register-user.usecase';
import { LoginUser } from './application/usecases/auth/login-user.usecase';
import { CreateBook } from './application/usecases/books/create-book.usecase';
import { GetBooks } from './application/usecases/books/get-books.usecase';
import { UpdateBook } from './application/usecases/books/update-book.usecase';
import { DeleteBook } from './application/usecases/books/delete-book.usecase';
import { SearchBooksExternal } from './application/usecases/books/search-books-external.usecase';

// Controllers
import { AuthController } from './infrastructure/controllers/auth.controller';
import { BookController } from './infrastructure/controllers/book.controller';

// Middlewares
import { AuthMiddleware } from './infrastructure/middlewares/auth.middleware';

async function bootstrap() {
  try {
    // Initialize database
    await initializeDatabase();
    
    // Create services
    const passwordHasher = new BcryptPasswordHasher();
    const tokenGenerator = new JwtTokenGenerator();
    const googleBooksApiService = new GoogleBooksApiService();
    
    // Create repositories
    const userRepository = new TypeOrmUserRepository(passwordHasher);
    const bookRepository = new TypeOrmBookRepository();
    
    // Create use cases
    const registerUserUseCase = new RegisterUser(userRepository);
    const loginUserUseCase = new LoginUser(userRepository, passwordHasher, tokenGenerator);
    const createBookUseCase = new CreateBook(bookRepository);
    const getBooksUseCase = new GetBooks(bookRepository);
    const updateBookUseCase = new UpdateBook(bookRepository);
    const deleteBookUseCase = new DeleteBook(bookRepository);
    const searchBooksExternalUseCase = new SearchBooksExternal(googleBooksApiService);
    
    // Create controllers
    const authController = new AuthController(registerUserUseCase, loginUserUseCase);
    const bookController = new BookController(
      createBookUseCase,
      getBooksUseCase,
      updateBookUseCase,
      deleteBookUseCase,
      searchBooksExternalUseCase
    );
    
    // Create middlewares
    const authMiddleware = new AuthMiddleware(tokenGenerator);
    
    // Create router
    const router = createRouter(authController, bookController, authMiddleware);
    
    // Initialize and start server
    const server = new Server();
    server.setRoutes(router);
    server.start();
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap(); 