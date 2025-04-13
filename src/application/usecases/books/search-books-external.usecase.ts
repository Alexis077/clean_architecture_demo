import { Book } from '../../../domain/entities/book.entity';
import { BookRepository } from '../../../domain/repositories/book-repository.interface';
import { BookApiInterface } from '../../../domain/repositories/book-api.interface';

export interface SearchBooksExternalUseCase {
  execute(query: string): Promise<Book[]>;
  executeById(id: string): Promise<Book | null>;
}

export class SearchBooksExternal implements SearchBooksExternalUseCase {
  constructor(private readonly bookApiService: BookApiInterface) {}

  async execute(query: string): Promise<Book[]> {
    if (!query || query.trim() === '') {
      return [];
    }
    
    return this.bookApiService.searchBooks(query);
  }

  async executeById(id: string): Promise<Book | null> {
    if (!id) {
      return null;
    }
    
    return this.bookApiService.getBookById(id);
  }
} 