import { Book } from '../entities/book.entity';
import { CreateBookDto, UpdateBookDto } from '../dtos/book.dto';

export interface BookRepository {
  findById(id: string): Promise<Book | null>;
  findByUserId(userId: string): Promise<Book[]>;
  create(book: CreateBookDto, userId: string): Promise<Book>;
  update(id: string, book: UpdateBookDto): Promise<Book | null>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<Book[]>;
} 