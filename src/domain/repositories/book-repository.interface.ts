import { BookModel, CreateBookDto, UpdateBookDto } from '../models/book.model';

export interface BookRepository {
  findById(id: string): Promise<BookModel | null>;
  findByUserId(userId: string): Promise<BookModel[]>;
  create(book: CreateBookDto, userId: string): Promise<BookModel>;
  update(id: string, book: UpdateBookDto): Promise<BookModel | null>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<BookModel[]>;
} 