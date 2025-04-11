import axios from 'axios';
import { Book } from '../../domain/entities/book.entity';
import { BookApiInterface, BookExternalDto } from '../../domain/repositories/book-api.interface';
import { config } from '../../config/env';

export class GoogleBooksApiService implements BookApiInterface {
  private readonly apiUrl = 'https://www.googleapis.com/books/v1/volumes';
  private readonly apiKey = config.googleBooksApiKey;
  
  async searchBooks(query: string): Promise<Book[]> {
    try {
      const response = await axios.get(`${this.apiUrl}?q=${encodeURIComponent(query)}&key=${this.apiKey}`);
      
      if (!response.data.items) {
        return [];
      }
      
      return response.data.items.map((item: BookExternalDto) => this.mapToBookModel(item));
    } catch (error) {
      console.error('Error searching books from Google Books API:', error);
      return [];
    }
  }
  
  async getBookById(id: string): Promise<Book | null> {
    try {
      const response = await axios.get(`${this.apiUrl}/${id}?key=${this.apiKey}`);
      return this.mapToBookModel(response.data);
    } catch (error) {
      console.error(`Error getting book with ID ${id} from Google Books API:`, error);
      return null;
    }
  }
  
  private mapToBookModel(bookData: BookExternalDto): Book {
    const volumeInfo = bookData.volumeInfo;
    let isbn = '';
    
    if (volumeInfo.industryIdentifiers && volumeInfo.industryIdentifiers.length > 0) {
      const isbn13 = volumeInfo.industryIdentifiers.find(id => id.type === 'ISBN_13');
      const isbn10 = volumeInfo.industryIdentifiers.find(id => id.type === 'ISBN_10');
      isbn = (isbn13 || isbn10)?.identifier || '';
    }
    
    return {
      id: '',
      title: volumeInfo.title,
      subtitle: volumeInfo.subtitle,
      author: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown',
      description: volumeInfo.description,
      publishedDate: volumeInfo.publishedDate,
      publisher: volumeInfo.publisher,
      isbn: isbn,
      pageCount: volumeInfo.pageCount,
      imageUrl: volumeInfo.imageLinks?.thumbnail || volumeInfo.imageLinks?.smallThumbnail,
      googleBooksId: bookData.id,
      userId: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
} 