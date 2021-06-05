import { Board } from '../../types/types';
import { IBoard } from '../../interfaces/interfaces';
import { DB } from '../../common/memory.db';
/**
 * Returns all boards
 * @returns {IBoard[]} array of Objects (board entities)
 */
const get = async (): Promise<IBoard[]> => DB.boards;

/**
 * Retrieves a board by id
 * @param {String} id String
 * @returns {IBoard} Object of borard entity that matched id
 */
const getById = async (id: string): Promise<Board> => {
  const board = DB.boards.find((el: { id: string }) => el.id === id);
  return board;
};

/**
 * Creates new board
 * @param {Object} board Object with request body params
 * @returns {IBoard} Object with created board entity
 */
const create = async (board: IBoard): Promise<Board> => {
  DB.boards.push(board);
  const newBoard = await getById(board.id);
  return newBoard;
};

/**
 * Updates a board by id with recived data
 * @param {String} id String
 * @param {IBoard} updatedBoard Object with request body params
 * @returns Object with updated board entity
 */
const update = async (id: string, updatedBoard: IBoard): Promise<Board> => {
  const board = await getById(id);
  if (!board) {
    throw new Error('Board not found');
  }
  board.title = updatedBoard.title;
  board.columns = updatedBoard.columns;
  return board;
};

/**
 * Deletes a board by id
 * @param {String} boardId String
 * @returns {Void} Nothing
 */
const remove = async (boardId: string): Promise<void> => {
  DB.boards = DB.boards.filter((board) => board.id !== boardId);
};

export { get, getById, create, update, remove };
