import { IBoard, ITask, IUser } from '../interfaces/interfaces';

export type Board = IBoard | undefined;

export type Task = ITask | undefined;

export type UserToResponse = Omit<IUser, 'password'>;
