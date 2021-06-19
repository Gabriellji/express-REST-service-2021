import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  //   OneToMany,
  //   ManyToOne,
} from 'typeorm';
import { IBoard } from '../interfaces/interfaces';
// import { Task } from './task.entity';
// import { User } from './user.entity';

@Entity()
export class Board implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    length: 100,
  })
  title!: string;

  @Column()
  columns!: number;

  //   @ManyToOne(() => User, (user) => user.boards)
  //   user!: User;

  //   @OneToMany(() => Task, (task) => task.board)
  //   tasks!: Task[];
}
