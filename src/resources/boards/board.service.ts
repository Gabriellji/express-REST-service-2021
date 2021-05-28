import { IBoard } from 'interfaces/interfaces';
import { Board } from 'interfaces/types';
import {
  get,
  getById,
  create,
  update,
  remove,
} from './board.memory.repository';
/**
 * Returns the result of getAll function
 * @returns {IBoard[]} array of Objects (board entities)
 */
const getAll = (): Promise<IBoard[]> => get();

/**
 * Returns the result of getBoardById function
 * @param {String} id String
 * @returns {IBoard} Object of borard entity
 */
const getBoardById = async (id: string): Promise<Board> => {
  const board = await getById(id);
  return board;
};

/**
 * Call a function from board repository module
 * @param {Object} board Object with request body params
 * @returns {Void} Nothing
 */
const createBoard = async (board: IBoard): Promise<Board> =>
  await create(board);
/**
 * Call a function from board repository module
 * @param {String} id String
 * @param {Object} data Object with updated props
 * @returns {Void} Nothing
 */
const updateBoard = async (id: string, data: IBoard): Promise<Board> =>
  await update(id, data);
/**
 * Call a function from board repository module
 * @param {String} id String
 * @returns {Void} Nothing
 */
const deleteBoard = async (id: string): Promise<void> => {
  await remove(id);
};

export { getAll, getBoardById, createBoard, updateBoard, deleteBoard };
