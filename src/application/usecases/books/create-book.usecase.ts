import { Book } from '../../../domain/entities/book.entity';
import { CreateBookDto } from '../../../application/dtos/book.dto';
import { BookRepository } from '../../../domain/repositories/book-repository.interface';
import { BookMapper } from '../../../application/mappers/book.mapper';

export interface CreateBookUseCase {
  execute(bookData: CreateBookDto, userId: string): Promise<Book>;
}

export class CreateBook implements CreateBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(bookData: CreateBookDto, userId: string): Promise<Book> {
    // Usar el mapper para convertir el DTO a una entidad de dominio
    const bookEntity = BookMapper.toEntity(bookData, userId);
    
    // Ahora pasamos la entidad completa al repositorio
    return this.bookRepository.create(bookEntity);
  }
} 