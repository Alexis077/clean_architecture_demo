import { Book } from '../entities/book.entity';
import { BookExternalDto } from '../../application/dtos/book.dto';

export interface BookApiInterface {
  searchBooks(query: string): Promise<Book[]>;
  getBookById(id: string): Promise<Book | null>;
} 