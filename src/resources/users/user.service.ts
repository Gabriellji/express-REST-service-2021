// import {
//   getAllUsers,
//   getById,
//   create,
//   update,
//   remove,
// } from './user.memory.repository';

// import { IUser } from '../../interfaces/interfaces';
// import { User } from 'src/types/types';

import { getRepository } from 'typeorm';
import { User } from '../../entities/user.entity';

const getAllUsers = (): Promise<User[]> => getRepository(User).find();

const getUserById = async (id: string): Promise<User | undefined> =>
  await getRepository(User).findOne(id);

const createUser = async (user: User): Promise<User> => {
  const userToCreate = getRepository(User).create({
    ...user,
  });
  const newUser = await getRepository(User).save(userToCreate);
  return newUser;
};

const updateUser = async (id: string, updatedUser: User): Promise<User> => {
  const userToUpdate = await getRepository(User).findOne(id);

  if (!userToUpdate) {
    throw new Error('User not found');
  }

  getRepository(User).merge(userToUpdate, updatedUser);

  const userToSave = await getRepository(User).save(userToUpdate);
  return userToSave;
};

const deleteUser = async (id: string): Promise<void> => {
  await getRepository(User).delete(id);
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
