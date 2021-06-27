import { Task } from '../../entities/task.entity';
import { getRepository } from 'typeorm';
import { User } from '../../entities/user.entity';
// import { getJWToken } from '../../services/token.services';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../common/config';
const expirationPeriod = '30d';

const getAllUsers = async (): Promise<User[]> =>
  await getRepository(User).find();

const getUserById = async (id: string): Promise<User | undefined> =>
  await getRepository(User).findOne(id);

const getUserByEmail = async (email: string): Promise<User | undefined> =>
  await getRepository(User).findOne({ where: { login: email } });

const userLogin = async (user: User, pass: string): Promise<string> => {
  const { password } = user;
  if (!config.JWT_SECRET_KEY) {
    throw new Error('rrrrr');
  }
  await bcrypt.compare(password, pass);

  const payload = {
    user: {
      userId: user.id,
      login: user.login,
    },
  };

  const token = jwt.sign(payload, config.JWT_SECRET_KEY, {
    expiresIn: expirationPeriod,
  });

  return token;
};

const registerUser = async (user: User): Promise<User> => {
  const userToCreate = getRepository(User).create({
    ...user,
  });

  const { password } = user;

  userToCreate.password = await User.hashPassword(password);

  const newUser = await getRepository(User).save(userToCreate);

  const payload = {
    user: {
      userId: newUser.id,
      login: user.login,
    },
  };

  if (!config.JWT_SECRET_KEY) {
    throw new Error('rrrrr');
  }

  jwt.sign(payload, config.JWT_SECRET_KEY, {
    expiresIn: expirationPeriod,
  });

  return newUser;
};

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
  await getRepository(Task)
    .createQueryBuilder()
    .update()
    .set({ userId: null })
    .where(`userId = :userId`, { userId: id })
    .execute();

  await getRepository(User).delete(id);
};

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  userLogin,
  registerUser,
  getUserByEmail,
};
