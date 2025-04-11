import { BookModel } from '../../models/book.model';
import { BookApiInterface } from '../../repositories/book-api.interface';

export interface SearchBooksExternalUseCase {
  execute(query: string): Promise<BookModel[]>;
  executeById(id: string): Promise<BookModel | null>;
}

export class SearchBooksExternal implements SearchBooksExternalUseCase {
  constructor(private readonly bookApiService: BookApiInterface) {}

  async execute(query: string): Promise<BookModel[]> {
    if (!query || query.trim() === '') {
      return [];
    }
    
    return this.bookApiService.searchBooks(query);
  }

  async executeById(id: string): Promise<BookModel | null> {
    if (!id) {
      return null;
    }
    
    return this.bookApiService.getBookById(id);
  }
} 