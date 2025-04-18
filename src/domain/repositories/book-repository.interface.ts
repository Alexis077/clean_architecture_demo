import { Book } from '../entities/book.entity';

export interface BookRepository {
  findById(id: string): Promise<Book | null>;
  findByUserId(userId: string): Promise<Book[]>;
  create(book: Book): Promise<Book>;
  update(id: string, book: Book): Promise<Book | null>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<Book[]>;
} 