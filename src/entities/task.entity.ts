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
  title!: string;

  @Column()
  order!: number;

  @Column()
  description!: string;

  @Column()
  userId!: string;

  @Column()
  boardId!: string;

  // @Column()
  // columnId!: string;

  //   @ManyToOne(() => Board, (board) => board.tasks)
  //   board!: Board;
  @ManyToOne((_type) => User)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  @ManyToOne((_type) => Board)
  @JoinColumn([{ name: 'boardId', referencedColumnName: 'id' }])
  @ManyToOne((_type) => Board)
  @JoinColumn([{ name: 'columnId', referencedColumnName: 'id' }])
  columnId!: string;
}
