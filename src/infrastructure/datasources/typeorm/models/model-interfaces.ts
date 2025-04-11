export interface IUserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  books: IBookModel[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IBookModel {
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
  user: IUserModel;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
} 