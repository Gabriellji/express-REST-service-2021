const { DB } = require('../../common/memory.db');
/**
 * Returns all boards
 * @returns {objects[]} array of objects (board entities)
 */
const getAll = async () => {
  const {boards} = DB;
  return boards;
}

/**
 * Retrieves a board by id
 * @param {string} id string
 * @returns {object} object of borard entity that matched id  
 */
const getBoardById = async id => {
  const board = await DB.boards.find(el => el.id === id);
  return board;
}

/**
 * Creates new board
 * @param {object} board object with request body params
 * @returns {object} object with created board entity
 */
const createBoard = async (board) => {
  DB.boards.push(board);
  const newBoard = await getBoardById(board.id);
  return newBoard;
};

/**
 * Updates a board by id with recived data
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
 * Deletes a board by id  
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