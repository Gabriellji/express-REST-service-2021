const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getBoard = async id => boardsRepo.getBoardById(id);

const createBoard = async board => boardsRepo.createBoard(board);

const updateBoard = async (id, board) => boardsRepo.updateBoard(id, board);

const deleteBoard = async id => boardsRepo.deleteBoard(id);

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };
