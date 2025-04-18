import { CreateBook } from '../../../../src/application/usecases/books/create-book.usecase';
import { BookRepository } from '../../../../src/domain/repositories/book-repository.interface';
import { CreateBookDto } from '../../../../src/application/dtos/book.dto';
import { Book } from '../../../../src/domain/entities/book.entity';
import { BookMapper } from '../../../../src/application/mappers/book.mapper';

// Mock del BookMapper
jest.mock('../../../../src/application/mappers/book.mapper');

describe('CreateBook UseCase', () => {
  let createBook: CreateBook;
  let mockBookRepository: jest.Mocked<BookRepository>;

  beforeEach(() => {
    // Limpiar todos los mocks antes de cada test
    jest.clearAllMocks();

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

    const mockBookEntity: Book = {
      id: 'book-123',
      title: 'Clean Architecture',
      author: 'Robert C. Martin',
      description: 'A book about software architecture',
      isbn: '9780134494166',
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Mock para el método toEntity del mapper
    (BookMapper.toEntity as jest.Mock).mockReturnValue(mockBookEntity);
    
    // Mock del repositorio para el método create
    mockBookRepository.create.mockResolvedValue(mockBookEntity);

    // Act
    const result = await createBook.execute(bookData, userId);

    // Assert
    expect(BookMapper.toEntity).toHaveBeenCalledWith(bookData, userId);
    expect(mockBookRepository.create).toHaveBeenCalledWith(mockBookEntity);
    expect(result).toEqual(mockBookEntity);
  });
}); 