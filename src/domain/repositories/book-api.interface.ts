import { Book } from '../entities/book.entity';

export interface BookApiInterface {
  searchBooks(query: string): Promise<Book[]>;
  getBookById(id: string): Promise<Book | null>;
} 