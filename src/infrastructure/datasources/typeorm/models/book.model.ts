import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Book } from '../../../../domain/entities/book.entity';
import { IBookModel, IUserModel } from './model-interfaces';

@Entity('books')
export class BookModel implements Book, IBookModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 255 })
  title!: string;

  @Column({ nullable: true })
  subtitle?: string;

  @Column({ length: 100 })
  author!: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column({ nullable: true })
  publishedDate?: string;

  @Column({ nullable: true })
  publisher?: string;

  @Column({ nullable: true })
  isbn?: string;

  @Column({ nullable: true })
  pageCount?: number;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  googleBooksId?: string;

  @ManyToOne('UserModel', 'books')
  @JoinColumn({ name: 'userId' })
  user!: IUserModel;

  @Column()
  userId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
} 