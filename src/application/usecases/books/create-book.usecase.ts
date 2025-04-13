import { Book } from '../../../domain/entities/book.entity';
import { CreateBookDto } from '../../../domain/dtos/book.dto';
import { BookRepository } from '../../../domain/repositories/book-repository.interface';

export interface CreateBookUseCase {
  execute(bookData: CreateBookDto, userId: string): Promise<Book>;
}

export class CreateBook implements CreateBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(bookData: CreateBookDto, userId: string): Promise<Book> {
    return this.bookRepository.create(bookData, userId);
  }
} 