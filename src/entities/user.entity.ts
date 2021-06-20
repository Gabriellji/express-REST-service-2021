import { UserToResponse } from 'src/types/types';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../interfaces/interfaces';
// import { Board } from './board.entity';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column({
    length: 100,
  })
  name: string;

  @Column()
  login: string;

  @Column({ select: false })
  password: string;

  static toResponse(user: IUser): UserToResponse {
    const { id, name, login } = user;
    return { id, name, login };
  }

  //   @OneToMany(() => Board, (board) => board.user)
  //   boards!: Board[];
}
