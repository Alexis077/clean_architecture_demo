import { Book } from '../entities/book.entity';

export interface BookExternalDto {
  id: string;
  volumeInfo: {
    title: string;
    subtitle?: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    publisher?: string;
    industryIdentifiers?: Array<{
      type: string;
      identifier: string;
    }>;
    pageCount?: number;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
  };
}

export interface BookApiInterface {
  searchBooks(query: string): Promise<Book[]>;
  getBookById(id: string): Promise<Book | null>;
} 