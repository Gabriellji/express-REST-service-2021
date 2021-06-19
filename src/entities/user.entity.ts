import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../interfaces/interfaces';
// import { Board } from './board.entity';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id!: string;

  @Column({
    length: 100,
  })
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  //   @OneToMany(() => Board, (board) => board.user)
  //   boards!: Board[];
}
