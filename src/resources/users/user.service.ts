import { Task } from '../../entities/task.entity';
import { getRepository } from 'typeorm';
import { User } from '../../entities/user.entity';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../../common/config';

const getAllUsers = async (): Promise<User[]> =>
  await getRepository(User).find();

const getUserById = async (id: string): Promise<User | undefined> =>
  await getRepository(User).findOne(id);

const createUser = async (user: User): Promise<User> => {
  const userToCreate = getRepository(User).create({
    ...user,
  });

  const { password } = user;

  const salt = await bcrypt.genSalt(10);

  userToCreate.password = await bcrypt.hash(password, salt);

  console.log(userToCreate.password);

  const newUser = await getRepository(User).save(userToCreate);

  const payload = {
    user: {
      userId: newUser.id,
      login: user.login,
    },
  };

  console.log(payload, 'PAYLOAD');

  if (!config.JWT_SECRET_KEY) {
    throw new Error('rrrrr');
  }

  jwt.sign(payload, config.JWT_SECRET_KEY, { expiresIn: 360000 });

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
  await getRepository(Task)
    .createQueryBuilder()
    .update()
    .set({ userId: null })
    .where(`userId = :userId`, { userId: id })
    .execute();

  await getRepository(User).delete(id);
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
