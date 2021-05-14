const DB = require('../../common/memory.db');

const getAll = async () => DB.users;

const getUserById = async id => {
  const user = DB.users.find(el => el.id === id);
  return user;
}

const createUser = async user => {
  DB.users.push(user);
  const newUser = await getUserById(user.id);
  return newUser;
};

const updateUser = async (id, updatedUser) => {
  const user = await getUserById(id);
  user.name = updatedUser.name;
  user.login = updatedUser.login;
  user.password = updatedUser.password;
  return user;
}

const deleteUser = async id => {
  const user = await DB.users.findIndex(el => el.id === id);
  DB.users.splice(user, 1);
}

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
