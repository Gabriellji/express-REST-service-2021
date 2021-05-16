const tasksRepo = require('./task.memory.repository');

const getAll = async () => tasksRepo.getAll();

const getTask = async id => tasksRepo.getTaskById(id);

const createTask = async task => tasksRepo.createTask(task);

const updateTask = async (id, task) => tasksRepo.updateTask(id, task);

const deleteTask = async (id) => tasksRepo.deleteTask(id);

const deleteTasksByBoardId = async boardId => tasksRepo.deleteTasksByBoardId(boardId);

module.exports = { getAll, getTask, createTask, updateTask, deleteTask, deleteTasksByBoardId };
