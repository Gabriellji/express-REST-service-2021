const { DB } = require('../../common/memory.db');

const getAll = async () => DB.tasks;

const getTaskById = async (id) => {
  const task = await DB.tasks.find((el) => el.id === id);
  return task;
};

const createTask = async (task) => {
  await DB.tasks.push(task);
};

const updateTask = async (id, updatedTask) => {
  const task = await getTaskById(id);
  task.title = await updatedTask.title;
  task.order = await updatedTask.order;
  task.description = await updatedTask.description;
  return task;
};

const deleteTask = async (taskId) => {
  DB.tasks = await DB.tasks.filter(({ id }) => id !== taskId);
};

const deleteTasksByBoardId = async (id) => {
  DB.tasks = await DB.tasks.filter(el => id !== el.boardId);
};

module.exports = {
  getAll,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  deleteTasksByBoardId,
};
