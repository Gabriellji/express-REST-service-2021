import { IBoard, ITask, IUser } from '../interfaces/interfaces';

export type User = IUser | undefined;

export type Board = IBoard | undefined;

export type Task = ITask | undefined;

export type UserToResponse = Omit<IUser, 'password'>;

export type BoardToUpdate = Omit<IBoard, 'id'>;
