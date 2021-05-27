import { ITask } from 'interfaces/user';
import {
  get,
  getById,
  create,
  update,
  remove,
  deleteByBoardId,
} from './task.memory.repository';

/**
 * Returns the result of getAll function
 * @returns {ITask[]} array of Objects ( task entities )
 */
const getAll = (): Promise<ITask[]> => get();

/**
 * Returns the result of getTaskById function
 * @param {String} id task id
 * @returns {ITask} Object of task entity that matched the id
 */
const getTask = async (id: string): Promise<ITask | undefined> => {
  const task = await getById(id);
  return task;
};

/**
 * Call a function from task repository module
 * @param {Object} task Object with request body params
 * @returns {ITask} Nothing
 */
const createTask = async (task: ITask): Promise<ITask | undefined> =>
  create(task);
/**
 * Call a function from task repository module
 * @param {String} id task id
 * @param {Object} data Object with updated props
 * @returns {Void} Nothing
 */
const updateTask = async (
  id: string,
  data: ITask
): Promise<ITask | undefined> => update(id, data);
/**
 * Call a function from task repository module
 * @param {String} id task id
 * @returns {Void} Nothing
 */
const deleteTask = async (id: string): Promise<void> => {
  await remove(id);
};

/**
 * Call a function from task repository module
 * @param {String} id board id
 * @returns {Void} Nothing
 */
const deleteTasksByBoardId = async (id: string): Promise<void> => {
  await deleteByBoardId(id);
};

export {
  getAll,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  deleteTasksByBoardId,
};
