const DB = require('../../common/memory.db');

const getAll = async () => DB.users;

const getUserById = async (id) => {
  const userById = DB.users.find(el => el.id === id);
  return userById;
}

module.exports = { getAll, getUserById };
