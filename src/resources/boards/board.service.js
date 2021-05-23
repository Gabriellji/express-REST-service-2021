const boardRepo = require('./board.memory.repository');
/**
 * Returns the result of getAll function
 * @returns {Objects[]} array of Objects (board entities)
 */
const getAll = () => boardRepo.getAll();

/**
 * Returns the result of getBoardById function
 * @param {String} id String
 * @returns {Object} Object of borard entity
 */
const getBoardById = async (id) => {
  const board = await boardRepo.getBoardById(id);
  return board;
};

/**
 * Call a function from board repository module
 * @param {Object} board Object with request body params
 * @returns {Void} Nothing
 */
const createBoard = async (board) => {
  await boardRepo.createBoard(board);
};

/**
 * Call a function from board repository module
 * @param {String} id String
 * @param {Object} data Object with updated props
 * @returns {Void} Nothing
 */
const updateBoard = async (id, data) => {
  await boardRepo.updateBoard(id, data);
};

/**
 * Call a function from board repository module
 * @param {String} id String
 * @returns {Void} Nothing 
 */
const deleteBoard = async (id) => {
  await boardRepo.deleteBoard(id);
};

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
};
