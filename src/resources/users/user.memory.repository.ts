import { User } from 'src/types/types';
import { DB } from '../../common/memory.db';

import { IUser } from '../../interfaces/interfaces';

/**
 * Returns all users
 * @returns {IUser[]} array of Objects ( user entities )
 */
const getAllUsers = async (): Promise<IUser[]> => DB.users;

/**
 * Retrieves a user by id
 * @param {String} id user id
 * @returns {IUser} Object of user entity that matched id
 */
const getById = async (id: string): Promise<User> => {
  const user = DB.users.find((el: { id: string }) => el.id === id);
  // if (!user) {
  //   throw new Error('User not found');
  // }
  return user;
};

/**
 * Creates new user
 * @param {Object} user Object with request body params
 * @returns {Object} user entity
 */
const create = async (user: IUser): Promise<User> => {
  DB.users.push(user);
  const newUser = await getById(user.id);
  return newUser;
};

/**
 * Updates user by id with recived data
 * @param {String} id user id
 * @param {Object} updatedUser Object with request body params
 * @returns {Object} updated user entity
 */
const update = async (id: string, updatedUser: IUser): Promise<IUser> => {
  const user = await getById(id);
  if (!user) {
    throw new Error('User not found');
  }
  user.name = updatedUser.name ? updatedUser.name : user.name;
  user.login = updatedUser.login ? updatedUser.login : user.login;
  user.password = updatedUser.password ? updatedUser.password : user.password;
  return user;
};

/**
 * Deletes user by id and assign all tasks of deleted user to null
 * @param {String} id user id
 * @returns {Void} Nothing
 */
const remove = async (id: string): Promise<void> => {
  const use: number = DB.users.findIndex((el: IUser) => el.id === id);
  DB.users.splice(use, 1);
  DB.tasks
    .filter((el) => el.userId === id)
    .map((element) => (element.userId = null));
};

export { getAllUsers, getById, create, update, remove };
