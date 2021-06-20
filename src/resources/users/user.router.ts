import * as express from 'express';
import { Request, Response } from 'express';
import { HttpCodes, StatusMsg } from '../../enums/enums';
import { getRepository } from 'typeorm';
// import { getManager } from 'typeorm';
import { User } from '../../entities/user.entity';
// import { Task } from '../../entities/task.entity';
// import { getConnection } from 'typeorm';
//import User from './user.model';
// import {
//   getAll,
//   getUser,
//   createUser,
//   updateUser,
//   deleteUser,
// } from './user.service';

// const entityManager = getManager();
// const connection = getConnection();

const { SERVER_ERROR, NOT_FOUND, OK, CREATED, NO_CONTENT } = HttpCodes;
const { SERVER_ERROR_MSG, NOT_FOUND_MSG, NO_CONTENT_MSG } = StatusMsg;
// const { PARAM_PEQUIRED } = RequiredError;

const router = express.Router();

router.get('/', async (_: Request, res: Response) => {
  try {
    const user = await getRepository(User).find();
    res.json(user);

    // const users = await getAll();
    // res.json(users.map(User.toResponse));
  } catch (err) {
    console.error(err.message);
    res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // if (!id) {
    //   throw new Error(PARAM_PEQUIRED);
    // }
    // const user = await getUser(id);

    const user = await getRepository(User).findOne(id);
    // return res.send(results);

    if (!user) {
      return res.status(NOT_FOUND).send(NOT_FOUND_MSG);
    }
    return res.status(OK).json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { login, name, password } = req.body;

    const newUser: User = await getRepository(User).create({
      login,
      name,
      password,
    });
    const results = await getRepository(User).save(newUser);

    return res.status(CREATED).json(User.toResponse(results));
  } catch (err) {
    console.error(err.message);
    return res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedUser = req.body;

    const userToUpdate = await getRepository(User).findOne(id);

    if (!userToUpdate) {
      return res.status(NOT_FOUND).send(NOT_FOUND_MSG);
    }

    getRepository(User).merge(userToUpdate, updatedUser);

    const userToSave = await getRepository(User).save(userToUpdate);

    return res.status(OK).json(userToSave);
  } catch (err) {
    console.error(err.message);
    return res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(NOT_FOUND).send(NOT_FOUND_MSG);
    }
    // const tasks = await getRepository(Task).find({});
    // await entityManager
    // await getConnection().transaction(async (transactionalEntityManager) => {
    //   await transactionalEntityManager.update(
    //     Task,
    //     { userId: id },
    //     { userId: id }
    //   );
    // });
    await getRepository(User).delete(id);
    return res.status(NO_CONTENT).send(NO_CONTENT_MSG);
  } catch (err) {
    console.error(err.message);
    return res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

export default router;
