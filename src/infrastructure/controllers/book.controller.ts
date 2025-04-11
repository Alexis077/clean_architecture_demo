import { Request, Response } from 'express';
import { CreateBookUseCase } from '../../domain/usecases/books/create-book.usecase';
import { GetBooksUseCase } from '../../domain/usecases/books/get-books.usecase';
import { UpdateBookUseCase } from '../../domain/usecases/books/update-book.usecase';
import { DeleteBookUseCase } from '../../domain/usecases/books/delete-book.usecase';
import { SearchBooksExternalUseCase } from '../../domain/usecases/books/search-books-external.usecase';
import { CreateBookDto, UpdateBookDto } from '../../domain/dtos/book.dto';
import { TokenPayload } from '../../domain/services/token-generator.interface';

export class BookController {
  constructor(
    private readonly createBookUseCase: CreateBookUseCase,
    private readonly getBooksUseCase: GetBooksUseCase,
    private readonly updateBookUseCase: UpdateBookUseCase,
    private readonly deleteBookUseCase: DeleteBookUseCase,
    private readonly searchBooksExternalUseCase: SearchBooksExternalUseCase
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as TokenPayload;
      const bookData: CreateBookDto = req.body;
      
      const book = await this.createBookUseCase.execute(bookData, user.id);
      
      res.status(201).json({
        success: true,
        data: book
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error creating book';
      res.status(400).json({
        success: false,
        message
      });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const books = await this.getBooksUseCase.execute();
      
      res.status(200).json({
        success: true,
        data: books
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error fetching books';
      res.status(500).json({
        success: false,
        message
      });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const book = await this.getBooksUseCase.executeById(id);
      
      if (!book) {
        res.status(404).json({
          success: false,
          message: 'Book not found'
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: book
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error fetching book';
      res.status(500).json({
        success: false,
        message
      });
    }
  }

  async getByUserId(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as TokenPayload;
      const books = await this.getBooksUseCase.executeByUserId(user.id);
      
      res.status(200).json({
        success: true,
        data: books
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error fetching user books';
      res.status(500).json({
        success: false,
        message
      });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const bookData: UpdateBookDto = req.body;
      
      const updatedBook = await this.updateBookUseCase.execute(id, bookData);
      
      if (!updatedBook) {
        res.status(404).json({
          success: false,
          message: 'Book not found'
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: updatedBook
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error updating book';
      res.status(400).json({
        success: false,
        message
      });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const success = await this.deleteBookUseCase.execute(id);
      
      if (!success) {
        res.status(404).json({
          success: false,
          message: 'Book not found'
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        message: 'Book deleted successfully'
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error deleting book';
      res.status(500).json({
        success: false,
        message
      });
    }
  }

  async searchExternal(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query.q as string;
      
      if (!query) {
        res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
        return;
      }
      
      const books = await this.searchBooksExternalUseCase.execute(query);
      
      res.status(200).json({
        success: true,
        data: books
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error searching books';
      res.status(500).json({
        success: false,
        message
      });
    }
  }

  async getExternalById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const book = await this.searchBooksExternalUseCase.executeById(id);
      
      if (!book) {
        res.status(404).json({
          success: false,
          message: 'Book not found'
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: book
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error fetching book from external service';
      res.status(500).json({
        success: false,
        message
      });
    }
  }
} 