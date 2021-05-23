const tasksRepo = require('./task.memory.repository');

/**
 * Returns function from task repository module
 * @returns {function} getAll function
 */
const getAll = () => tasksRepo.getAll();

/**
 * Returns an object of task entity with matched id
 * @param {string} id string
 * @returns {object} object of task entity
 */
const getTask = async (id) => {
  const task = await tasksRepo.getTaskById(id);
  return task;
};

/**
 * Call a function from task repository module
 * @param {object} task object with request body params
 * @returns {void} Nothing
 */
const createTask = async (task) => {
  await tasksRepo.createTask(task);
};

/**
 * Call a function from task repository module
 * @param {string} id string
 * @param {object} data object with updated props
 * @returns {void} Nothing
 */
const updateTask = async (id, data) => {
  await tasksRepo.updateTask(id, data);
};

/**
 * Call a function from task repository module
 * @param {string} id string
 * @returns {void} Nothing 
 */
const deleteTask = async (id) => {
  await tasksRepo.deleteTask(id);
};

/**
 * Call a function from task repository module
 * @param {string} id string
 * @returns {void} Nothing 
 */
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

