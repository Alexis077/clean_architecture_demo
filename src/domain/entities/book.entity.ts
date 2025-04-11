import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('books')
export class Book {
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

  @ManyToOne(() => User, user => user.books)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column()
  userId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
} 