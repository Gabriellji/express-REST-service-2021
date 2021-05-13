const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUser = async (id) => usersRepo.getUserById(id);

module.exports = { getAll, getUser };
