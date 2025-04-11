import { BookModel } from '../models/book.model';

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
  searchBooks(query: string): Promise<BookModel[]>;
  getBookById(id: string): Promise<BookModel | null>;
} 