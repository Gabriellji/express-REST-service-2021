const usersRepo = require('./user.memory.repository');

/**
 * Returns the result of getAll function
 * @returns {objects[]} array of user entities
 */
const getAll = () => usersRepo.getAll();

/**
 * Returns the result of getUserById function
 * @param {string} id user id 
 * @returns {object} user entity that matched the id
 */
const getUser = async id => usersRepo.getUserById(id);

/**
 * Returns the result of createUser function
 * @param {object} user object with request body params
 * @returns {object} created user entity 
 */
const createUser = async user => usersRepo.createUser(user);

/**
 * Returns the result of updateUser function
 * @param {string} id user id 
 * @param {object} user object with request body params
 * @returns {object} updated user entity
 */
const updateUser = async (id, user) => usersRepo.updateUser(id, user);

/**
 * Call deleteUser function
 * @param {string} id user id 
 * @returns {void} Nothing
 */
const deleteUser = async id => usersRepo.deleteUser(id);

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
