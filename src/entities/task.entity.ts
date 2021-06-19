import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ITask } from '../interfaces/interfaces';
import { Board } from './board.entity';

@Entity()
export class Task implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    length: 100,
  })
  title!: string;

  @Column()
  order!: number;

  @Column()
  description!: string;

  @Column()
  userId!: string;

  @Column()
  boardId!: string;

  @Column()
  columnId!: string;

  @ManyToOne(() => Board, (board) => board.tasks)
  board!: Board;
}
