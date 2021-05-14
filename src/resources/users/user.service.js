const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUser = async id => usersRepo.getUserById(id);

const createUser = async user => usersRepo.createUser(user);

const updateUser = async (id, user) => usersRepo.updateUser(id, user);

const deleteUser = async id => usersRepo.deleteUser(id);

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
