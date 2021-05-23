const tasksRepo = require('./task.memory.repository');

/**
 * Returns the result of getAll function
 * @returns {objects[]} array of objects ( task entities )
 */
const getAll = () => tasksRepo.getAll();

/**
 * Returns the result of getTaskById function
 * @param {string} id task id
 * @returns {object} object of task entity that matched the id
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
 * @param {string} id task id
 * @param {object} data object with updated props
 * @returns {void} Nothing
 */
const updateTask = async (id, data) => {
  await tasksRepo.updateTask(id, data);
};

/**
 * Call a function from task repository module
 * @param {string} id task id
 * @returns {void} Nothing 
 */
const deleteTask = async (id) => {
  await tasksRepo.deleteTask(id);
};

/**
 * Call a function from task repository module
 * @param {string} id board id
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

