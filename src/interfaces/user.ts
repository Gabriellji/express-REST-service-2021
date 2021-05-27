export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;
}

export interface IBoard {
  id: string;
  title: string;
  columns: number;
}

export interface IDB {
  users: IUser[];
  boards: IBoard[];
  tasks: ITask[];
}
