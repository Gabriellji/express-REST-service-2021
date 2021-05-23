const { DB } = require('../../common/memory.db');

/**
 * Returns all tasks
 * @returns {objects[]} array of objects ( task entities )
 */
const getAll = async () => DB.tasks;

/**
 * Retrieves a task by id
 * @param {string} id task id
 * @returns {object} object of task entity that matched id
 */
const getTaskById = async (id) => {
  const task = await DB.tasks.find((el) => el.id === id);
  return task;
};

/**
 * Creates new tasks
 * @param {object} task object with request body params
 * @returns {void} Nothing
 */
const createTask = async (task) => {
  await DB.tasks.push(task);
};

/**
 * Updates a task by id with recived data
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
 * Delete task  
 * @param {string} taskId task id 
 * @returns {void} Nothing
 */
const deleteTask = async (taskId) => {
  DB.tasks = await DB.tasks.filter(task => task.id !== taskId);
};

/**
 * Delete all tasks if board deleted  
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
