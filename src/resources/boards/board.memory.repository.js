const { DB } = require('../../common/memory.db');
/**
 * Returns array of board entities
 * @returns {objects[]} array of objects
 */
const getAll = async () => {
  const {boards} = DB;
  return boards;
}

/**
 * Returns an object of board entity with matched id
 * @param {string} id string
 * @returns {object} object of borard entity
 */
const getBoardById = async id => {
  const board = await DB.boards.find(el => el.id === id);
  return board;
}

/**
 * Returns an object with created board entity
 * @param {object} board object with request body params
 * @returns {object} object with created board entity
 */
const createBoard = async (board) => {
  DB.boards.push(board);
  const newBoard = await getBoardById(board.id);
  return newBoard;
};

/**
 * Returns an object with updated board entity
 * @param {string} id string 
 * @param {object} updatedBoard object with request body params 
 * @returns object with updated board entity
 */
const updateBoard = async (id, updatedBoard) => {
  const board = await getBoardById(id);
  board.title = await updatedBoard.title;
  board.columns = await updatedBoard.columns;
  return board;
};

/**
 * Assign to boards array filtered boards array by board id  
 * @param {string} boardId string 
 * @returns {void} Nothing
 */
const deleteBoard = async (boardId) => {
  DB.boards = await DB.boards.filter(board => board.id !== boardId);
};

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
};