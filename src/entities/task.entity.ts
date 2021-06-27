import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ITask } from '../interfaces/interfaces';
import { Board } from './board.entity';
import { User } from './user.entity';

@Entity()
export class Task implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    length: 100,
  })
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: false })
  userId: string | null;

  @ManyToOne(() => Board, (board) => board.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'boardId' })
  board: Board;

  @Column({ nullable: false })
  boardId: string;

  @Column()
  columnId: string;
}
