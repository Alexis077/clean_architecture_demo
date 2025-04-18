import { Book } from '../../../domain/entities/book.entity';
import { UpdateBookDto } from '../../../application/dtos/book.dto';
import { BookRepository } from '../../../domain/repositories/book-repository.interface';

export interface UpdateBookUseCase {
  execute(id: string, bookData: UpdateBookDto): Promise<Book | null>;
}

export class UpdateBook implements UpdateBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(id: string, bookData: UpdateBookDto): Promise<Book | null> {
    const book = await this.bookRepository.findById(id);
    
    if (!book) {
      return null;
    }
    
    return this.bookRepository.update(id, {
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
    });
  }
} 