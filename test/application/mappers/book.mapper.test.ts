import { BookMapper } from '../../../src/application/mappers/book.mapper';
import { Book } from '../../../src/domain/entities/book.entity';
import { CreateBookDto, UpdateBookDto } from '../../../src/application/dtos/book.dto';

describe('BookMapper', () => {
  describe('toEntity', () => {
    it('should convert CreateBookDto to Book entity', () => {
      // Arrange
      const createBookDto: CreateBookDto = {
        title: 'Test Book',
        author: 'Test Author',
        subtitle: 'Test Subtitle',
        description: 'Test Description',
        publishedDate: '2023-01-01',
        publisher: 'Test Publisher',
        isbn: '1234567890',
        pageCount: 200,
        imageUrl: 'http://test.com/image.jpg',
        googleBooksId: 'test123'
      };
      const userId = 'user123';

      // Act
      const result = BookMapper.toEntity(createBookDto, userId);

      // Assert
      expect(result).toBeInstanceOf(Book);
      expect(result.id).toEqual(expect.any(String));
      expect(result.title).toEqual(createBookDto.title);
      expect(result.author).toEqual(createBookDto.author);
      expect(result.userId).toEqual(userId);
      expect(result.subtitle).toEqual(createBookDto.subtitle);
      expect(result.description).toEqual(createBookDto.description);
      expect(result.publishedDate).toEqual(createBookDto.publishedDate);
      expect(result.publisher).toEqual(createBookDto.publisher);
      expect(result.isbn).toEqual(createBookDto.isbn);
      expect(result.pageCount).toEqual(createBookDto.pageCount);
      expect(result.imageUrl).toEqual(createBookDto.imageUrl);
      expect(result.googleBooksId).toEqual(createBookDto.googleBooksId);
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('toUpdateEntity', () => {
    it('should update only provided fields in UpdateBookDto', () => {
      // Arrange
      const existingBook = new Book(
        'book123',
        'Original Title',
        'Original Author',
        'user123',
        new Date('2023-01-01'),
        new Date('2023-01-01'),
        'Original Subtitle',
        'Original Description',
        '2023-01-01',
        'Original Publisher',
        '1234567890',
        200,
        'http://original.com/image.jpg',
        'original123'
      );

      const updateBookDto: UpdateBookDto = {
        title: 'Updated Title',
        description: 'Updated Description'
      };

      // Act
      const result = BookMapper.toUpdateEntity(existingBook, updateBookDto);

      // Assert
      expect(result).toBeInstanceOf(Book);
      expect(result.id).toEqual(existingBook.id);
      expect(result.title).toEqual(updateBookDto.title);
      expect(result.author).toEqual(existingBook.author); // No changed
      expect(result.userId).toEqual(existingBook.userId);
      expect(result.subtitle).toEqual(existingBook.subtitle); // No changed
      expect(result.description).toEqual(updateBookDto.description);
      expect(result.publishedDate).toEqual(existingBook.publishedDate); // No changed
      expect(result.publisher).toEqual(existingBook.publisher); // No changed
      expect(result.isbn).toEqual(existingBook.isbn); // No changed
      expect(result.pageCount).toEqual(existingBook.pageCount); // No changed
      expect(result.imageUrl).toEqual(existingBook.imageUrl); // No changed
      expect(result.googleBooksId).toEqual(existingBook.googleBooksId); // No changed
      expect(result.createdAt).toEqual(existingBook.createdAt);
      expect(result.updatedAt).toBeInstanceOf(Date);
      expect(result.updatedAt).not.toEqual(existingBook.updatedAt);
    });

    it('should handle explicit null/undefined values correctly', () => {
      // Arrange
      const existingBook = new Book(
        'book123',
        'Original Title',
        'Original Author',
        'user123',
        new Date('2023-01-01'),
        new Date('2023-01-01'),
        'Original Subtitle',
        'Original Description',
        '2023-01-01',
        'Original Publisher',
        '1234567890',
        200,
        'http://original.com/image.jpg',
        'original123'
      );

      const updateBookDto: UpdateBookDto = {
        subtitle: undefined,
        description: null as any,
        pageCount: 0
      };

      // Act
      const result = BookMapper.toUpdateEntity(existingBook, updateBookDto);

      // Assert
      expect(result.subtitle).toBeUndefined();
      expect(result.description).toBeNull();
      expect(result.pageCount).toBe(0);
    });
  });

  describe('toDto', () => {
    it('should convert Book entity to DTO', () => {
      // Arrange
      const book = new Book(
        'book123',
        'Test Book',
        'Test Author',
        'user123',
        new Date('2023-01-01'),
        new Date('2023-01-01'),
        'Test Subtitle',
        'Test Description',
        '2023-01-01',
        'Test Publisher',
        '1234567890',
        200,
        'http://test.com/image.jpg',
        'test123'
      );

      // Act
      const result = BookMapper.toDto(book);

      // Assert
      expect(result.id).toEqual(book.id);
      expect(result.title).toEqual(book.title);
      expect(result.author).toEqual(book.author);
      expect(result.userId).toEqual(book.userId);
      expect(result.subtitle).toEqual(book.subtitle);
      expect(result.description).toEqual(book.description);
      expect(result.publishedDate).toEqual(book.publishedDate);
      expect(result.publisher).toEqual(book.publisher);
      expect(result.isbn).toEqual(book.isbn);
      expect(result.pageCount).toEqual(book.pageCount);
      expect(result.imageUrl).toEqual(book.imageUrl);
      expect(result.googleBooksId).toEqual(book.googleBooksId);
    });
  });
}); 