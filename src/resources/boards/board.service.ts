import { getRepository } from 'typeorm';
import { Board } from '../../entities/board.entity';

const getAllBoards = (): Promise<Board[]> => {
  return getRepository(Board).find();
};

const getBoardById = async (id: string): Promise<Board | undefined> => {
  const board = await getRepository(Board).findOne(id);
  return board;
};

const createBoard = async (data: Board): Promise<Board> => {
  const newBoard: Board = await getRepository(Board).create({
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
  await getRepository(Board).delete(id);
};

export { getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard };
