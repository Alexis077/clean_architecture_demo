import { Book } from '../../../../src/domain/entities/book.entity';
import { BookRepository } from '../../../../src/domain/repositories/book-repository.interface';
import { UpdateBookDto } from '../../../../src/application/dtos/book.dto';
import { UpdateBook } from '../../../../src/application/usecases/books/update-book.usecase';
import { BookMapper } from '../../../../src/application/mappers/book.mapper';

describe('UpdateBook UseCase', () => {
  let updateBookUseCase: UpdateBook;
  let bookRepositoryMock: BookRepository;
  let toUpdateEntitySpy: jest.SpyInstance;

  beforeEach(() => {
    // Create repository mock
    bookRepositoryMock = {
      findById: jest.fn(),
      update: jest.fn(),
      findByUserId: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn()
    };

    // Spy on the mapper's toUpdateEntity method
    toUpdateEntitySpy = jest.spyOn(BookMapper, 'toUpdateEntity');

    updateBookUseCase = new UpdateBook(bookRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return null if book is not found', async () => {
    // Arrange
    const bookId = 'nonexistent-id';
    const updateBookDto: UpdateBookDto = { title: 'Updated Title' };
    
    (bookRepositoryMock.findById as jest.Mock).mockResolvedValue(null);

    // Act
    const result = await updateBookUseCase.execute(bookId, updateBookDto);

    // Assert
    expect(result).toBeNull();
    expect(bookRepositoryMock.findById).toHaveBeenCalledWith(bookId);
    expect(bookRepositoryMock.update).not.toHaveBeenCalled();
    expect(toUpdateEntitySpy).not.toHaveBeenCalled();
  });

  it('should update book successfully', async () => {
    // Arrange
    const bookId = 'existing-id';
    const existingBook = new Book(
      bookId,
      'Original Title',
      'Original Author',
      'user-id',
      new Date(),
      new Date(),
      'Original Subtitle'
    );
    
    const updateBookDto: UpdateBookDto = { 
      title: 'Updated Title',
      description: 'Updated Description'
    };

    const updatedBook = new Book(
      bookId,
      'Updated Title',
      'Original Author',
      'user-id',
      existingBook.createdAt,
      new Date(),
      'Original Subtitle',
      'Updated Description'
    );

    (bookRepositoryMock.findById as jest.Mock).mockResolvedValue(existingBook);
    toUpdateEntitySpy.mockReturnValue(updatedBook);
    (bookRepositoryMock.update as jest.Mock).mockResolvedValue(updatedBook);

    // Act
    const result = await updateBookUseCase.execute(bookId, updateBookDto);

    // Assert
    expect(result).toBe(updatedBook);
    expect(bookRepositoryMock.findById).toHaveBeenCalledWith(bookId);
    expect(toUpdateEntitySpy).toHaveBeenCalledWith(existingBook, updateBookDto);
    expect(bookRepositoryMock.update).toHaveBeenCalledWith(bookId, updatedBook);
  });

  it('should handle repository errors', async () => {
    // Arrange
    const bookId = 'existing-id';
    const existingBook = new Book(
      bookId,
      'Original Title',
      'Original Author',
      'user-id',
      new Date(),
      new Date()
    );
    
    const updateBookDto: UpdateBookDto = { title: 'Updated Title' };
    const updatedBook = new Book(
      bookId,
      'Updated Title',
      'Original Author',
      'user-id',
      existingBook.createdAt,
      new Date()
    );

    const error = new Error('Database error');
    
    (bookRepositoryMock.findById as jest.Mock).mockResolvedValue(existingBook);
    toUpdateEntitySpy.mockReturnValue(updatedBook);
    (bookRepositoryMock.update as jest.Mock).mockRejectedValue(error);

    // Act & Assert
    await expect(updateBookUseCase.execute(bookId, updateBookDto)).rejects.toThrow(error);
    expect(bookRepositoryMock.findById).toHaveBeenCalledWith(bookId);
    expect(toUpdateEntitySpy).toHaveBeenCalledWith(existingBook, updateBookDto);
    expect(bookRepositoryMock.update).toHaveBeenCalledWith(bookId, updatedBook);
  });
}); 