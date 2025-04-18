export interface BookDto {
  id: string;
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
  userId: string;
}

export interface CreateBookDto {
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
}

export interface UpdateBookDto extends Partial<CreateBookDto> {}

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