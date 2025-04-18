// Entidad de dominio pura sin dependencias externas
export class Book {
  constructor(
    public id: string,
    public title: string,
    public author: string,
    public userId: string,
    public createdAt: Date,
    public updatedAt: Date,
    public subtitle?: string,
    public description?: string,
    public publishedDate?: string,
    public publisher?: string,
    public isbn?: string,
    public pageCount?: number,
    public imageUrl?: string,
    public googleBooksId?: string,
  ) {}
} 