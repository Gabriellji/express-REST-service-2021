const tasksRepo = require('./task.memory.repository');

/**
 * Returns the result of getAll function
 * @returns {Objects[]} array of Objects ( task entities )
 */
const getAll = () => tasksRepo.getAll();

/**
 * Returns the result of getTaskById function
 * @param {String} id task id
 * @returns {Object} Object of task entity that matched the id
 */
const getTask = async (id) => {
  const task = await tasksRepo.getTaskById(id);
  return task;
};

/**
 * Call a function from task repository module
 * @param {Object} task Object with request body params
 * @returns {Void} Nothing
 */
const createTask = async (task) => {
  await tasksRepo.createTask(task);
};

/**
 * Call a function from task repository module
 * @param {String} id task id
 * @param {Object} data Object with updated props
 * @returns {Void} Nothing
 */
const updateTask = async (id, data) => {
  await tasksRepo.updateTask(id, data);
};

/**
 * Call a function from task repository module
 * @param {String} id task id
 * @returns {Void} Nothing 
 */
const deleteTask = async (id) => {
  await tasksRepo.deleteTask(id);
};

/**
 * Call a function from task repository module
 * @param {String} id board id
 * @returns {Void} Nothing 
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

