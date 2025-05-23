import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { UserModel } from '../infrastructure/datasources/typeorm/models/user.model';
import { BookModel } from '../infrastructure/datasources/typeorm/models/book.model';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'book_management',
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [UserModel, BookModel],
  subscribers: [],
  migrations: [],
});

export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (error) {
    console.error('Error during Data Source initialization:', error);
    throw error;
  }
}; 