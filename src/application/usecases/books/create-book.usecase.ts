import { Book } from '../../../domain/entities/book.entity';
import { CreateBookDto } from '../../../application/dtos/book.dto';
import { BookRepository } from '../../../domain/repositories/book-repository.interface';

export interface CreateBookUseCase {
  execute(bookData: CreateBookDto, userId: string): Promise<Book>;
}

export class CreateBook implements CreateBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(bookData: CreateBookDto, userId: string): Promise<Book> {
    return this.bookRepository.create({
      title: bookData.title,
      subtitle: bookData.subtitle,
      author: bookData.author,
      description: bookData.description,
      publishedDate: bookData.publishedDate,
      publisher: bookData.publisher,
      isbn: bookData.isbn,
      pageCount: bookData.pageCount,
      imageUrl: bookData.imageUrl,
      googleBooksId: bookData.googleBooksId
    }, userId);
  }
} 