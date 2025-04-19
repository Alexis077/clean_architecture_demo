import { Book } from '../../../../domain/entities/book.entity';
import { BookModel } from '../models/book.model';

export class BookMapper {
  /**
   * Maps a domain Book entity to a TypeORM BookModel
   */
  static toPersistence(domainBook: Book): Partial<BookModel> {
    return {
      id: domainBook.id,
      title: domainBook.title,
      subtitle: domainBook.subtitle,
      author: domainBook.author,
      description: domainBook.description,
      publishedDate: domainBook.publishedDate,
      publisher: domainBook.publisher,
      isbn: domainBook.isbn,
      pageCount: domainBook.pageCount,
      imageUrl: domainBook.imageUrl,
      googleBooksId: domainBook.googleBooksId,
      userId: domainBook.userId,
      createdAt: domainBook.createdAt,
      updatedAt: domainBook.updatedAt
    };
  }

  /**
   * Maps a TypeORM BookModel to a domain Book entity
   */
  static toDomain(bookModel: BookModel): Book {
    return new Book(
      bookModel.id,
      bookModel.title,
      bookModel.author,
      bookModel.userId,
      bookModel.createdAt,
      bookModel.updatedAt,
      bookModel.subtitle,
      bookModel.description,
      bookModel.publishedDate,
      bookModel.publisher,
      bookModel.isbn,
      bookModel.pageCount,
      bookModel.imageUrl,
      bookModel.googleBooksId
    );
  }
} 