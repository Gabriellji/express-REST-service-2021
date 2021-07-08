import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IBoard } from '../interfaces/interfaces';
import { Task } from './task.entity';
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

  @Column({ type: 'json', array: false })
  columns: Array<{ title: string; order: number }>;

  @OneToMany(() => Task, (task) => task.board, {
    cascade: true,
  })
  tasks: Task[];
}
