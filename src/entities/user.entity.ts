import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IUser } from '../interfaces/interfaces';
import { Board } from './board.entity';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    length: 100,
  })
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @OneToMany(() => Board, (board) => board.user)
  boards!: Board[];
}
