import express from 'express';
import User from './user.model';
import {
  getAll,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from './user.service';

import { HttpCodes, StatusMsg, RequiredError } from '../../enums/enums';

const { SERVER_ERROR, NOT_FOUND, OK, CREATED, NO_CONTENT } = HttpCodes;
const { SERVER_ERROR_MSG, NOT_FOUND_MSG, NO_CONTENT_MSG } = StatusMsg;
const { PARAM_PEQUIRED } = RequiredError;

const router = express.Router();

router.get('/', async (_, res) => {
  try {
    const users = await getAll();
    res.json(users.map(User.toResponse));
  } catch (err) {
    console.error(err.message);
    res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error(PARAM_PEQUIRED);
    }
    const user = await getUser(id);
    if (!user) {
      return res.status(NOT_FOUND).send(NOT_FOUND_MSG);
    }
    return res.status(OK).json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

router.post('/', async (req, res) => {
  try {
    const { login, name, password } = req.body;

    const user = await createUser(
      new User({
        name,
        login,
        password,
      })
    );
    return res.status(CREATED).json(User.toResponse(user));
  } catch (err) {
    console.error(err.message);
    return res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error(PARAM_PEQUIRED);
    }
    const updatedUser = req.body;
    const user = await updateUser(id, updatedUser);
    if (!user) {
      return res.status(NOT_FOUND).send(NOT_FOUND_MSG);
    }
    return res.status(OK).json(User.toResponse(user));
  } catch (err) {
    console.error(err.message);
    return res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error(PARAM_PEQUIRED);
    }
    await deleteUser(id);
    res.status(NO_CONTENT).send(NO_CONTENT_MSG);
  } catch (err) {
    console.error(err.message);
    res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

export default router;
