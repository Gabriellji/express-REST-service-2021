import * as express from 'express';
import { Request, Response } from 'express';
import { HttpCodes, StatusMsg } from '../../enums/enums';
import { User } from '../../entities/user.entity';
import {
  getAllUsers,
  getUserByEmail,
  userLogin,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from './user.service';

const { SERVER_ERROR, NOT_FOUND, OK, CREATED, NO_CONTENT } = HttpCodes;
const { SERVER_ERROR_MSG, NOT_FOUND_MSG, NO_CONTENT_MSG } = StatusMsg;

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;

    const user = await getUserByEmail(login);
    console.log(user, 'USER');

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const token = await userLogin(user, password);
    return res.status(OK).json(token);
  } catch (err) {
    console.error(err.message);
    return res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

router.get('/', async (_: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users.map(User.toResponse));
  } catch (err) {
    console.error(err.message);
    res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(NOT_FOUND).send(NOT_FOUND_MSG);
    }

    const user = await getUserById(id);

    if (!user) {
      return res.status(NOT_FOUND).send(NOT_FOUND_MSG);
    }
    return res.status(OK).json(User.toResponse(user));
  } catch (err) {
    console.error(err.message);
    return res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const results = await createUser({ ...req.body });

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

    if (!id) {
      return res.status(NOT_FOUND).send(NOT_FOUND_MSG);
    }

    const userToSave = await updateUser(id, updatedUser);

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
    deleteUser(id);
    return res.status(NO_CONTENT).send(NO_CONTENT_MSG);
  } catch (err) {
    console.error(err.message);
    return res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

export default router;
