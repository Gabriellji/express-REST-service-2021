const boardRepo = require('./board.memory.repository');
/**
 * Returns function from board repository module
 * @returns {function} getAll function
 */
const getAll = () => boardRepo.getAll();

/**
 * Returns an object of board entity with matched id
 * @param {string} id string
 * @returns {object} object of borard entity
 */
const getBoardById = async (id) => {
  const board = await boardRepo.getBoardById(id);
  return board;
};

/**
 * Call a function from board repository module
 * @param {object} board object with request body params
 * @returns {void} Nothing
 */
const createBoard = async (board) => {
  await boardRepo.createBoard(board);
};

/**
 * Call a function from board repository module
 * @param {string} id string
 * @param {object} data object with updated props
 * @returns {void} Nothing
 */
const updateBoard = async (id, data) => {
  await boardRepo.updateBoard(id, data);
};

/**
 * Call a function from board repository module
 * @param {string} id string
 * @returns {void} Nothing 
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
