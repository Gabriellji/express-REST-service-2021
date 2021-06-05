import {
  getAllUsers,
  getById,
  create,
  update,
  remove,
} from './user.memory.repository';

import { IUser } from '../../interfaces/interfaces';

/**
 * Returns the result of getAll function
 * @returns {IUser[]} array of user entities
 */
const getAll = (): Promise<IUser[]> => getAllUsers();

/**
 * Returns the result of getUserById function
 * @param {String} id user id
 * @returns {IUser} user entity that matched the id
 */
const getUser = async (id: string): Promise<IUser> => getById(id);

/**
 * Returns the result of createUser function
 * @param {IUser} user Object with request body params
 * @returns {IUser} created user entity
 */
const createUser = async (user: IUser): Promise<IUser> => create(user);

/**
 * Returns the result of updateUser function
 * @param {String} id user id
 * @param {IUser} user Object with request body params
 * @returns {IUser} updated user entity
 */
const updateUser = async (id: string, user: IUser): Promise<IUser> =>
  update(id, user);

/**
 * Call deleteUser function
 * @param {String} id user id
 * @returns {Void} Nothing
 */
const deleteUser = async (id: string): Promise<void> => remove(id);

export { getAll, getUser, createUser, updateUser, deleteUser };
