const boardRepo = require('./board.memory.repository');

const getAll = () => boardRepo.getAll();

const getBoardById = async (id) => {
  const board = await boardRepo.getBoardById(id);
  return board;
};

const createBoard = async (board) => {
  await boardRepo.createBoard(board);
};

const updateBoard = async (id, data) => {
  await boardRepo.updateBoard(id, data);
};

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
