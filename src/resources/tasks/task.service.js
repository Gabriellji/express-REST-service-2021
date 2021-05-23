const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const getTask = async (id) => {
  const task = await tasksRepo.getTaskById(id);
  return task;
};

const createTask = async (task) => {
  await tasksRepo.createTask(task);
};

const updateTask = async (id, data) => {
  await tasksRepo.updateTask(id, data);
};

const deleteTask = async (id) => {
  await tasksRepo.deleteTask(id);
};

const deleteTasksByBoardId = async (id) => {
  await tasksRepo.deleteTasksByBoardId(id);
};

module.exports = {
  getAll,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  deleteTasksByBoardId,
};

// const resetUserId = async (id) => {
//   await tasksRepo.resetUserId(id);
// };

// module.exports = {
//   getAll,
//   getById,
//   create,
//   update,
//   deleteById,
//   deleteByBoardId,
//   resetUserId,
// };
