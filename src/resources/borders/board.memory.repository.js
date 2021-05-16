const { DB } = require('../../common/memory.db');
const tasksService = require('../tasks/task.service');

const getAll = async () => DB.boards;

const getBoardById = async id => {
  const board = DB.boards.find(el => el.id === id);
  return board;
}

const createBoard = async board => {
  DB.boards.push(board);
  const newBoard = await getBoardById(board.id);
  return newBoard;
};

const updateBoard = async (id, updatedBoard) => {
  const board = await getBoardById(id);
  board.title = updatedBoard.title;
  board.columns = updatedBoard.columns;
  return board;
}

const deleteBoard = async id => {
  const board = DB.boards.findIndex(el => el.id === id);
  DB.boards.splice(board, 1);
  await tasksService.deleteTasksByBoardId(id);
};

module.exports = { getAll, getBoardById, createBoard, updateBoard, deleteBoard }