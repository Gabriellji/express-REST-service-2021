import { ITask } from '../../interfaces/interfaces';
import { Task } from '../../types/types';

import { DB } from '../../common/memory.db';
/**
 * Returns all tasks
 * @returns {Objects[]} array of Objects ( task entities )
 */
const get = async (): Promise<ITask[]> => DB.tasks;

/**
 * Retrieves a task by id
 * @param {String} id task id
 * @returns {ITask} Object of task entity that matched id
 */
const getById = async (id: string): Promise<Task> => {
  const task = DB.tasks.find((el: { id: string }) => el.id === id);
  return task;
};

/**
 * Creates new tasks
 * @param {Object} task Object with request body params
 * @returns {ITask} Nothing
 */
const create = async (task: ITask): Promise<Task> => {
  DB.tasks.push(task);
  const newTask = await getById(task.id);
  return newTask;
};

/**
 * Updates a task by id with recived data
 * @param {String} id task id
 * @param {ITask} updatedTask Object with request body params
 * @returns Object with updated task entity
 */
const update = async (id: string, updatedTask: ITask): Promise<Task> => {
  const task = await getById(id);
  if (!task) {
    throw new Error('Task not found');
  }
  task.title = updatedTask.title;
  task.order = updatedTask.order;
  task.description = updatedTask.description;
  return task;
};

/**
 * Delete task
 * @param {String} taskId task id
 * @returns {Void} Nothing
 */
const remove = async (taskId: string): Promise<void> => {
  DB.tasks = DB.tasks.filter((task) => task.id !== taskId);
};

/**
 * Delete all tasks if board deleted
 * @param {String} id board id
 * @returns {Void} Nothing
 */
const deleteByBoardId = async (id: string): Promise<void> => {
  DB.tasks = DB.tasks.filter((el) => id !== el.boardId);
};

export { get, getById, create, update, remove, deleteByBoardId };
