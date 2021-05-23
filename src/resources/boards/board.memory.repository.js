const { DB } = require('../../common/memory.db');

const getAll = async () => DB.boards;

const getBoardById = async id => {
  const board = await DB.boards.find(el => el.id === id);
  return board;
}

const createBoard = async (board) => {
  DB.boards.push(board);
  const newBoard = await getBoardById(board.id);
  return newBoard;
};

const updateBoard = async (id, updatedBoard) => {
  const board = await getBoardById(id);
  board.title = await updatedBoard.title;
  board.columns = await updatedBoard.columns;
  return board;
};

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