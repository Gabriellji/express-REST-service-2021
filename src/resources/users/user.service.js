const usersRepo = require('./user.memory.repository');

/**
 * Returns the result of getAll function
 * @returns {Objects[]} array of user entities
 */
const getAll = () => usersRepo.getAll();

/**
 * Returns the result of getUserById function
 * @param {String} id user id 
 * @returns {Object} user entity that matched the id
 */
const getUser = async id => usersRepo.getUserById(id);

/**
 * Returns the result of createUser function
 * @param {Object} user Object with request body params
 * @returns {Object} created user entity 
 */
const createUser = async user => usersRepo.createUser(user);

/**
 * Returns the result of updateUser function
 * @param {String} id user id 
 * @param {Object} user Object with request body params
 * @returns {Object} updated user entity
 */
const updateUser = async (id, user) => usersRepo.updateUser(id, user);

/**
 * Call deleteUser function
 * @param {String} id user id 
 * @returns {Void} Nothing
 */
const deleteUser = async id => usersRepo.deleteUser(id);

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
