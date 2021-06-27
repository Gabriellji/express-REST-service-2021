import { UserToResponse } from 'src/types/types';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IUser } from '../interfaces/interfaces';
import { Task } from './task.entity';
import * as bcrypt from 'bcrypt';
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

  hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
