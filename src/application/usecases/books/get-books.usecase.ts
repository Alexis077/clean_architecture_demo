import { Book } from '../../../domain/entities/book.entity';
import { BookRepository } from '../../../domain/repositories/book-repository.interface';

export interface GetBooksUseCase {
  execute(): Promise<Book[]>;
  executeByUserId(userId: string): Promise<Book[]>;
  executeById(id: string): Promise<Book | null>;
}

export class GetBooks implements GetBooksUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }

  async executeByUserId(userId: string): Promise<Book[]> {
    return this.bookRepository.findByUserId(userId);
  }

  async executeById(id: string): Promise<Book | null> {
    return this.bookRepository.findById(id);
  }
} 