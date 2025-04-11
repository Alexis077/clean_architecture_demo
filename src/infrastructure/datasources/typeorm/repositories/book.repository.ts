import { Repository } from 'typeorm';
import { BookModel } from '../models/book.model';
import { BookModel as DomainBookModel, CreateBookDto, UpdateBookDto } from '../../../../domain/models/book.model';
import { BookRepository } from '../../../../domain/repositories/book-repository.interface';
import { AppDataSource } from '../../../../config/database';

export class TypeOrmBookRepository implements BookRepository {
  private repository: Repository<BookModel>;
  
  constructor() {
    this.repository = AppDataSource.getRepository(BookModel);
  }
  
  async findById(id: string): Promise<DomainBookModel | null> {
    const book = await this.repository.findOne({ 
      where: { id },
      relations: ['user']
    });
    
    return book ? book : null;
  }
  
  async findByUserId(userId: string): Promise<DomainBookModel[]> {
    return this.repository.find({
      where: { userId },
      relations: ['user']
    });
  }
  
  async create(bookData: CreateBookDto, userId: string): Promise<DomainBookModel> {
    const book = this.repository.create({
      ...bookData,
      userId
    });
    
    return this.repository.save(book);
  }
  
  async update(id: string, bookData: UpdateBookDto): Promise<DomainBookModel | null> {
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
  
  async findAll(): Promise<DomainBookModel[]> {
    return this.repository.find({
      relations: ['user']
    });
  }
} 