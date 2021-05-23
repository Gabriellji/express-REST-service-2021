const { DB } = require('../../common/memory.db');

/**
 * Returns all tasks
 * @returns {Objects[]} array of Objects ( task entities )
 */
const getAll = async () => DB.tasks;

/**
 * Retrieves a task by id
 * @param {String} id task id
 * @returns {Object} Object of task entity that matched id
 */
const getTaskById = async (id) => {
  const task = await DB.tasks.find((el) => el.id === id);
  return task;
};

/**
 * Creates new tasks
 * @param {Object} task Object with request body params
 * @returns {Void} Nothing
 */
const createTask = async (task) => {
  await DB.tasks.push(task);
};

/**
 * Updates a task by id with recived data
 * @param {String} id task id 
 * @param {Object} updatedTask Object with request body params 
 * @returns Object with updated task entity
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
 * @param {String} taskId task id 
 * @returns {Void} Nothing
 */
const deleteTask = async (taskId) => {
  DB.tasks = await DB.tasks.filter(task => task.id !== taskId);
};

/**
 * Delete all tasks if board deleted  
 * @param {String} id board id 
 * @returns {Void} Nothing
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
