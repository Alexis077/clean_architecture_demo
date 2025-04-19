import { Repository } from 'typeorm';
import { BookModel } from '../models/book.model';
import { Book } from '../../../../domain/entities/book.entity';
import { BookRepository } from '../../../../domain/repositories/book-repository.interface';
import { AppDataSource } from '../../../../config/database';
import { BookMapper } from '../mappers/book.mapper';

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
    
    return book ? BookMapper.toDomain(book) : null;
  }
  
  async findByUserId(userId: string): Promise<Book[]> {
    const books = await this.repository.find({
      where: { userId },
      relations: ['user']
    });
    
    return books.map(book => BookMapper.toDomain(book));
  }
  
  async create(book: Book): Promise<Book> {
    const bookData = BookMapper.toPersistence(book);
    const bookModel = this.repository.create(bookData);
    
    const savedBook = await this.repository.save(bookModel);
    return BookMapper.toDomain(savedBook);
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
    const updatedBook = await this.repository.findOne({
      where: { id },
      relations: ['user']
    });
    
    return updatedBook ? BookMapper.toDomain(updatedBook) : null;
  }
  
  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
  
  async findAll(): Promise<Book[]> {
    const books = await this.repository.find({
      relations: ['user']
    });
    
    return books.map(book => BookMapper.toDomain(book));
  }
} 