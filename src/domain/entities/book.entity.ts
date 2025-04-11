// Entidad de dominio pura sin dependencias externas
export interface Book {
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