import { CreateBook } from '../../../../src/domain/usecases/books/create-book.usecase';
import { BookRepository } from '../../../../src/domain/repositories/book-repository.interface';
import { Book } from '../../../../src/domain/entities/book.entity';
import { CreateBookDto } from '../../../../src/domain/dtos/book.dto';

describe('CreateBook UseCase', () => {
  let createBook: CreateBook;
  let mockBookRepository: jest.Mocked<BookRepository>;

  beforeEach(() => {
    mockBookRepository = {
      findById: jest.fn(),
      findByUserId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn()
    } as jest.Mocked<BookRepository>;

    createBook = new CreateBook(mockBookRepository);
  });

  it('should successfully create a book', async () => {
    // Arrange
    const userId = 'user-123';
    const bookData: CreateBookDto = {
      title: 'Clean Architecture',
      author: 'Robert C. Martin',
      description: 'A book about software architecture',
      isbn: '9780134494166'
    };

    const createdBook: Book = {
      id: 'book-123',
      title: 'Clean Architecture',
      author: 'Robert C. Martin',
      description: 'A book about software architecture',
      isbn: '9780134494166',
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockBookRepository.create.mockResolvedValue(createdBook);

    // Act
    const result = await createBook.execute(bookData, userId);

    // Assert
    expect(mockBookRepository.create).toHaveBeenCalledWith(bookData, userId);
    expect(result).toEqual(createdBook);
  });
}); 