import { BookModel } from '../../models/book.model';
import { BookRepository } from '../../repositories/book-repository.interface';

export interface GetBooksUseCase {
  execute(): Promise<BookModel[]>;
  executeByUserId(userId: string): Promise<BookModel[]>;
  executeById(id: string): Promise<BookModel | null>;
}

export class GetBooks implements GetBooksUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(): Promise<BookModel[]> {
    return this.bookRepository.findAll();
  }

  async executeByUserId(userId: string): Promise<BookModel[]> {
    return this.bookRepository.findByUserId(userId);
  }

  async executeById(id: string): Promise<BookModel | null> {
    return this.bookRepository.findById(id);
  }
} 