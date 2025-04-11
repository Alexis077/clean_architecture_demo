import { BookModel, CreateBookDto } from '../../models/book.model';
import { BookRepository } from '../../repositories/book-repository.interface';

export interface CreateBookUseCase {
  execute(bookData: CreateBookDto, userId: string): Promise<BookModel>;
}

export class CreateBook implements CreateBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(bookData: CreateBookDto, userId: string): Promise<BookModel> {
    return this.bookRepository.create(bookData, userId);
  }
} 