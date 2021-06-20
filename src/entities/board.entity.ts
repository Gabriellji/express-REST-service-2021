import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  //   OneToMany,
  //   ManyToOne,
} from 'typeorm';
import { IBoard } from '../interfaces/interfaces';
import { Task } from './task.entity';
// import { Task } from './task.entity';
// import { User } from './user.entity';

@Entity()
export class Board implements IBoard {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column({
    length: 100,
  })
  title: string;

  //   @Column('int', { array: true })
  //   // eslint-disable-next-line @typescript-eslint/ban-types
  //   columns: [order: number, title: string];

  @Column({ type: 'json', array: false })
  columns: Array<{ title: string; order: number }>;

  @OneToMany((_type) => Task, (task) => task.board, {
    cascade: true,
  })
  tasks: Task[];

  //   @OneToOne(() => Column)
  //   @JoinColumn()
  //   columns: Columns[];

  //   @ManyToOne(() => User, (user) => user.boards)
  //   user!: User;

  //   @OneToMany(() => Task, (task) => task.board)
  //   tasks!: Task[];
}
