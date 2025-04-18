import { Repository } from 'typeorm';
import { BookModel } from '../models/book.model';
import { Book } from '../../../../domain/entities/book.entity';
import { BookRepository } from '../../../../domain/repositories/book-repository.interface';
import { AppDataSource } from '../../../../config/database';

export class TypeOrmBookRepository implements BookRepository {
  private repository: Repository<BookModel>;
  
  constructor() {
    this.repository = AppDataSource.getRepository(BookModel);
  }
  
  async findById(id: string): Promise<Book | null> {
    const book = await this.repository.findOne({ 
      where: { id },
      relations: ['user']
    });
    
    return book ? book : null;
  }
  
  async findByUserId(userId: string): Promise<Book[]> {
    return this.repository.find({
      where: { userId },
      relations: ['user']
    });
  }
  
  async create(book: Book): Promise<Book> {
    const bookModel = this.repository.create({
      id: book.id,
      title: book.title,
      subtitle: book.subtitle,
      author: book.author,
      description: book.description,
      publishedDate: book.publishedDate,
      publisher: book.publisher,
      isbn: book.isbn,
      pageCount: book.pageCount,
      imageUrl: book.imageUrl,
      googleBooksId: book.googleBooksId,
      userId: book.userId,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt
    });
    
    return this.repository.save(bookModel);
  }
  
  async update(id: string, bookData: Partial<{
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
  }>): Promise<Book | null> {
    const book = await this.findById(id);
    
    if (!book) {
      return null;
    }
    
    await this.repository.update(id, bookData);
    return this.findById(id);
  }
  
  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
  
  async findAll(): Promise<Book[]> {
    return this.repository.find({
      relations: ['user']
    });
  }
} 