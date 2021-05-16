const { DB } = require('../../common/memory.db');

const getAll = async () => {
  const { tasks } = DB;
  return tasks;
};

const getTaskById = async (id) => {
  const task = DB.tasks.find((el) => el.id === id);
  return task;
};

const createTask = async (task) => {
  DB.tasks.push(task);
  const newTask = await getTaskById(task.id);
  return newTask;
};

const updateTask = async (id, updatedTask) => {
  const task = await getTaskById(id);
  task.title = updatedTask.title;
  task.order = updatedTask.order;
  task.description = updatedTask.description;
  return task;
};

const deleteTask = async (id) => {
  const index = DB.tasks.findIndex(el => el.id === id);
  DB.tasks.splice(index, 1);
};

const deleteTasksByBoardId = async boardId => {
  DB.tasks = DB.tasks.filter(task => task.boardId !== boardId);
};

module.exports = { getAll, getTaskById, createTask, updateTask, deleteTask, deleteTasksByBoardId };
