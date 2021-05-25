const { DB } = require('../../common/memory.db');
/**
 * Returns all boards
 * @returns {Objects[]} array of Objects (board entities)
 */
const getAll = async () => {
  const {boards} = DB;
  return boards;
}

/**
 * Retrieves a board by id
 * @param {String} id String
 * @returns {Object} Object of borard entity that matched id  
 */
const getBoardById = async id => {
  const board = await DB.boards.find(el => el.id === id);
  return board;
}

/**
 * Creates new board
 * @param {Object} board Object with request body params
 * @returns {Object} Object with created board entity
 */
const createBoard = async (board) => {
  DB.boards.push(board);
  const newBoard = await getBoardById(board.id);
  return newBoard;
};

/**
 * Updates a board by id with recived data
 * @param {String} id String 
 * @param {Object} updatedBoard Object with request body params 
 * @returns Object with updated board entity
 */
const updateBoard = async (id, updatedBoard) => {
  const board = await getBoardById(id);
  board.title = await updatedBoard.title;
  board.columns = await updatedBoard.columns;
  return board;
};

/**
 * Deletes a board by id  
 * @param {String} boardId String 
 * @returns {Void} Nothing
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