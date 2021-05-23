const { DB } = require('../../common/memory.db');

/**
 * Returns all users
 * @returns {objects[]} array of objects ( user entities )
 */
const getAll = async () => DB.users;

/**
 * Retrieves a user by id
 * @param {string} id user id
 * @returns {object} object of user entity that matched id
 */
const getUserById = async id => {
  const user = DB.users.find(el => el.id === id);
  return user;
}

/**
 * Creates new user
 * @param {object} user object with request body params
 * @returns {object} user entity
 */
const createUser = async user => {
  DB.users.push(user);
  const newUser = await getUserById(user.id);
  return newUser;
};

/**
 * Updates user by id with recived data
 * @param {string} id user id 
 * @param {object} updatedUser object with request body params
 * @returns {object} updated user entity
 */
const updateUser = async (id, updatedUser) => {
  const user = await getUserById(id);
  user.name = updatedUser.name;
  user.login = updatedUser.login;
  user.password = updatedUser.password;
  return user;
}

/**
 * Deletes user by id and assign all tasks of deleted user to null 
 * @param {string} id user id
 * @returns {void} Nothing
 */
const deleteUser = async id => {
  const use = DB.users.findIndex(el => el.id === id);
  DB.users.splice(use, 1);
  while (DB.tasks.findIndex(el => el.userId === id) !== -1) {
    const ind = DB.tasks.findIndex(el => el.userId === id);
    DB.tasks[ind].userId = null;
  }
};

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
