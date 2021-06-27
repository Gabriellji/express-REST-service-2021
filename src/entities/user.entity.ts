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

  @Column()
  password: string;

  @OneToMany((_type) => Task, (task) => task.user)
  tasks: Task[];

  static toResponse(user: User): UserToResponse {
    const { id, name, login } = user;
    return { id, name, login };
  }

  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const pass = bcrypt.hashSync(password, salt);
    return pass;
  }

  static checkIfUnencryptedPasswordIsValid(
    unencryptedPassword: string,
    password: string
  ) {
    return bcrypt.compareSync(unencryptedPassword, password);
  }
}
