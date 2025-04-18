import { Book } from '../entities/book.entity';

export interface BookRepository {
  findById(id: string): Promise<Book | null>;
  findByUserId(userId: string): Promise<Book[]>;
  create(book: {
    title: string;
    subtitle?: string;
    author: string;
    description?: string;
    publishedDate?: string;
    publisher?: string;
    isbn?: string;
    pageCount?: number;
    imageUrl?: string;
    googleBooksId?: string;
  }, userId: string): Promise<Book>;
  update(id: string, book: Partial<{
    title: string;
    subtitle?: string;
    author: string;
    description?: string;
    publishedDate?: string;
    publisher?: string;
    isbn?: string;
    pageCount?: number;
    imageUrl?: string;
    googleBooksId?: string;
  }>): Promise<Book | null>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<Book[]>;
} 