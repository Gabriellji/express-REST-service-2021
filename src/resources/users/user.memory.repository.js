const { DB } = require('../../common/memory.db');

/**
 * Returns an array of user entities
 * @returns {objects[]} array of objects
 */
const getAll = async () => DB.users;

/**
 * Returns an object of user entity with matched id
 * @param {string} id user id
 * @returns {object} object of user entity
 */
const getUserById = async id => {
  const user = DB.users.find(el => el.id === id);
  return user;
}

/**
 * Returns created user entity ( object )
 * @param {object} user object with request body params
 * @returns {object} 
 */
const createUser = async user => {
  DB.users.push(user);
  const newUser = await getUserById(user.id);
  return newUser;
};

/**
 * Returns updated user entity ( object )
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
 * Finds the index of user to delete and assign all tasks to null of deleted user
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
