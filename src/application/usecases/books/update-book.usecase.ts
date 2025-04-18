import { Book } from '../../../domain/entities/book.entity';
import { UpdateBookDto } from '../../../application/dtos/book.dto';
import { BookRepository } from '../../../domain/repositories/book-repository.interface';
import { BookMapper } from '../../../application/mappers/book.mapper';

export interface UpdateBookUseCase {
  execute(id: string, bookData: UpdateBookDto): Promise<Book | null>;
}

export class UpdateBook implements UpdateBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(id: string, bookData: UpdateBookDto): Promise<Book | null> {
    const book = await this.bookRepository.findById(id);
    
    if (!book) {
      return null;
    }
    
    // Usar el mapper para convertir el DTO a una entidad de dominio
    const updatedBookEntity = BookMapper.toUpdateEntity(book, bookData);
    
    return this.bookRepository.update(id, updatedBookEntity);
  }
} 