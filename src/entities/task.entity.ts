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

  //   @Column()
  //   userId!: string;

  //   @Column()
  //   boardId!: string;

  // @Column()
  // columnId!: string;

  //   @ManyToOne(() => Board, (board) => board.tasks)
  //   board!: Board;
  //   @ManyToOne((_type) => User, {
  //     cascade: ['update'],
  //   })
  //   @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  //   userId: string;

  //   @ManyToOne((_type) => Board)
  //   @JoinColumn([{ name: 'board_id', referencedColumnName: 'id' }])
  //   boardId: string;

  //   @ManyToOne((_type) => Board)
  //   @JoinColumn([{ name: 'column_id', referencedColumnName: 'id' }])
  //   columnId: string;

  @ManyToOne((_type) => User, (user) => user.tasks)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: false })
  userId: string;

  @ManyToOne((_type) => Board, (board) => board.tasks)
  @JoinColumn({ name: 'boardId' })
  board: Board;

  @Column({ nullable: false })
  boardId: string;

  @Column()
  columnId: string;
}
