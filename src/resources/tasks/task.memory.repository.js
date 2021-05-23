const { DB } = require('../../common/memory.db');

/**
 * Returns array of tasks entities
 * @returns {objects[]} array of objects
 */
const getAll = async () => DB.tasks;

/**
 * Returns an object of task entity with matched id
 * @param {string} id task id
 * @returns {object} object of task entity
 */
const getTaskById = async (id) => {
  const task = await DB.tasks.find((el) => el.id === id);
  return task;
};

/**
 * Push new task entity ( object ) to array of tasks
 * @param {object} task object with request body params
 * @returns {void} Nothing
 */
const createTask = async (task) => {
  await DB.tasks.push(task);
};

/**
 * Returns an object with updated task entity
 * @param {string} id task id 
 * @param {object} updatedTask object with request body params 
 * @returns object with updated task entity
 */
const updateTask = async (id, updatedTask) => {
  const task = await getTaskById(id);
  task.title = await updatedTask.title;
  task.order = await updatedTask.order;
  task.description = await updatedTask.description;
  return task;
};

/**
 * Assign tasks array to filtered tasks array by task id  
 * @param {string} taskId task id 
 * @returns {void} Nothing
 */
const deleteTask = async (taskId) => {
  DB.tasks = await DB.tasks.filter(task => task.id !== taskId);
};

/**
 * Assign tasks array to filtered tasks array by board id  
 * @param {string} id board id 
 * @returns {void} Nothing
 */
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
