export interface BookModel {
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
  createdAt: Date;
  updatedAt: Date;
}

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