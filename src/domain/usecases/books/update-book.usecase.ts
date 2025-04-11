import { BookModel, UpdateBookDto } from '../../models/book.model';
import { BookRepository } from '../../repositories/book-repository.interface';

export interface UpdateBookUseCase {
  execute(id: string, bookData: UpdateBookDto): Promise<BookModel | null>;
}

export class UpdateBook implements UpdateBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(id: string, bookData: UpdateBookDto): Promise<BookModel | null> {
    const book = await this.bookRepository.findById(id);
    
    if (!book) {
      return null;
    }
    
    return this.bookRepository.update(id, bookData);
  }
} 