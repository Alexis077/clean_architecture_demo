import { v4 as uuidv4 } from 'uuid';
import { Book } from '../../domain/entities/book.entity';
import { CreateBookDto, UpdateBookDto } from '../dtos/book.dto';

export class BookMapper {
  /**
   * Mapea un DTO de creación a una entidad de dominio Book
   */
  static toEntity(createBookDto: CreateBookDto, userId: string): Book {
    const now = new Date();
    
    return new Book(
      uuidv4(), // generar un ID único
      createBookDto.title,
      createBookDto.author,
      userId,
      now, // createdAt
      now, // updatedAt
      createBookDto.subtitle,
      createBookDto.description,
      createBookDto.publishedDate,
      createBookDto.publisher,
      createBookDto.isbn,
      createBookDto.pageCount,
      createBookDto.imageUrl,
      createBookDto.googleBooksId
    );
  }

  /**
   * Mapea un DTO de actualización a una entidad de dominio Book
   */
  static toUpdateEntity(existingBook: Book, updateBookDto: UpdateBookDto): Book {
    // Para campos opcionales, verificamos si la propiedad está definida en el DTO
    // antes de decidir si se debe actualizar o no
    const updatedBook = new Book(
      existingBook.id,
      updateBookDto.title || existingBook.title,
      updateBookDto.author || existingBook.author,
      existingBook.userId,
      existingBook.createdAt,
      new Date(), // updatedAt se actualiza al momento de la operación
      'subtitle' in updateBookDto ? updateBookDto.subtitle : existingBook.subtitle,
      'description' in updateBookDto ? updateBookDto.description : existingBook.description,
      'publishedDate' in updateBookDto ? updateBookDto.publishedDate : existingBook.publishedDate,
      'publisher' in updateBookDto ? updateBookDto.publisher : existingBook.publisher,
      'isbn' in updateBookDto ? updateBookDto.isbn : existingBook.isbn,
      'pageCount' in updateBookDto ? updateBookDto.pageCount : existingBook.pageCount,
      'imageUrl' in updateBookDto ? updateBookDto.imageUrl : existingBook.imageUrl,
      'googleBooksId' in updateBookDto ? updateBookDto.googleBooksId : existingBook.googleBooksId
    );
    
    return updatedBook;
  }

  /**
   * Mapea una entidad Book a un DTO para respuesta
   */
  static toDto(book: Book) {
    return {
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
    };
  }
} 