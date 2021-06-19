import * as express from 'express';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../entities/user.entity';
//import User from './user.model';
// import {
//   getAll,
//   getUser,
//   createUser,
//   updateUser,
//   deleteUser,
// } from './user.service';

import { HttpCodes, StatusMsg } from '../../enums/enums';

const { SERVER_ERROR, NOT_FOUND, OK, CREATED } = HttpCodes;
const { SERVER_ERROR_MSG, NOT_FOUND_MSG } = StatusMsg;
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
    // const { login, name, password } = req.body;

    const newUser = await getRepository(User).create(req.body);
    const results = await getRepository(User).save(newUser);

    // const user = await createUser(
    //   new User({
    //     name,
    //     login,
    //     password,
    //   })
    // );
    // if (!user) {
    //   throw new Error('Something went wrong...');
    // }
    return res.status(CREATED).json(results);
  } catch (err) {
    console.error(err.message);
    return res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

// router.put('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!id) {
//       throw new Error(PARAM_PEQUIRED);
//     }
//     const updatedUser = req.body;
//     const user = await updateUser(id, updatedUser);
//     if (!user) {
//       return res.status(NOT_FOUND).send(NOT_FOUND_MSG);
//     }
//     return res.status(OK).json(User.toResponse(user));
//   } catch (err) {
//     console.error(err.message);
//     return res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
//   }
// });

// router.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!id) {
//       throw new Error(PARAM_PEQUIRED);
//     }
//     await deleteUser(id);
//     res.status(NO_CONTENT).send(NO_CONTENT_MSG);
//   } catch (err) {
//     console.error(err.message);
//     res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
//   }
// });

export default router;
