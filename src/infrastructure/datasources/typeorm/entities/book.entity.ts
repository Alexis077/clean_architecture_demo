import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { Book } from '../../../../domain/entities/book.entity';

@Entity('books')
export class BookEntity implements Book {
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

  @ManyToOne(() => UserEntity, user => user.books)
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;

  @Column()
  userId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
} 