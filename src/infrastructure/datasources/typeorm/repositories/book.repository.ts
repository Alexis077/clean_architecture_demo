import { Repository } from 'typeorm';
import { Book } from '../../../../domain/entities/book.entity';
import { BookModel, CreateBookDto, UpdateBookDto } from '../../../../domain/models/book.model';
import { BookRepository } from '../../../../domain/repositories/book-repository.interface';
import { AppDataSource } from '../../../../config/database';

export class TypeOrmBookRepository implements BookRepository {
  private repository: Repository<Book>;
  
  constructor() {
    this.repository = AppDataSource.getRepository(Book);
  }
  
  async findById(id: string): Promise<BookModel | null> {
    const book = await this.repository.findOne({ 
      where: { id },
      relations: ['user']
    });
    
    return book ? book : null;
  }
  
  async findByUserId(userId: string): Promise<BookModel[]> {
    return this.repository.find({
      where: { userId },
      relations: ['user']
    });
  }
  
  async create(bookData: CreateBookDto, userId: string): Promise<BookModel> {
    const book = this.repository.create({
      ...bookData,
      userId
    });
    
    return this.repository.save(book);
  }
  
  async update(id: string, bookData: UpdateBookDto): Promise<BookModel | null> {
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
  
  async findAll(): Promise<BookModel[]> {
    return this.repository.find({
      relations: ['user']
    });
  }
} 