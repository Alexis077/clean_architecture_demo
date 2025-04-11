import { BookRepository } from '../../repositories/book-repository.interface';

export interface DeleteBookUseCase {
  execute(id: string): Promise<boolean>;
}

export class DeleteBook implements DeleteBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(id: string): Promise<boolean> {
    const book = await this.bookRepository.findById(id);
    
    if (!book) {
      return false;
    }
    
    return this.bookRepository.delete(id);
  }
} 