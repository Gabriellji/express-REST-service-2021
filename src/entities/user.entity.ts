import { UserToResponse } from 'src/types/types';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IUser } from '../interfaces/interfaces';
import { Task } from './task.entity';
@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column({ select: false })
  password: string;

  @OneToMany((_type) => Task, (task) => task.user)
  tasks: Task[];

  static toResponse(user: User): UserToResponse {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
