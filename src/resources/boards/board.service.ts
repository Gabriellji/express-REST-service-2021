import { Task } from '../../entities/task.entity';
import { getRepository } from 'typeorm';
import { Board } from '../../entities/board.entity';

const getAllBoards = async (): Promise<Board[]> =>
  await getRepository(Board).find();

const getBoardById = async (id: string): Promise<Board | undefined> => {
  const board = await getRepository(Board).findOne(id);
  return board;
};

const createBoard = async (data: Board): Promise<Board> => {
  const newBoard: Board = getRepository(Board).create({
    ...data,
  });
  const results = await getRepository(Board).save(newBoard);
  return results;
};

const updateBoard = async (id: string, updatedBoard: Board): Promise<Board> => {
  const boardToUpdate = await getRepository(Board).findOne(id);
  if (!boardToUpdate) {
    throw new Error('Board not found');
  }
  getRepository(Board).merge(boardToUpdate, updatedBoard);
  const boardToSave = await getRepository(Board).save(boardToUpdate);
  return boardToSave;
};

const deleteBoard = async (id: string): Promise<void> => {
  await getRepository(Task)
    .createQueryBuilder()
    .delete()
    .where(`boardId = :boardId`, { boardId: id })
    .execute();

  await getRepository(Board).delete(id);
};

export { getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard };
