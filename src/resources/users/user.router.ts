import express from 'express';
import User from './user.model';
import {
  getAll,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from './user.service';

const router = express.Router();

router.get('/', async (_, res) => {
  try {
    const users = await getAll();
    res.json(users.map(User.toResponse));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error('ID param is required');
    }
    const user = await getUser(id);
    if (!user) {
      return res.status(404);
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
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
    return res.status(201).json(User.toResponse(user));
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error('ID param is required');
    }
    const updatedUser = req.body;
    const user = await updateUser(id, updatedUser);
    if (!user) {
      return res.status(404);
    }
    return res.status(200).json(User.toResponse(user));
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error('ID param is required');
    }
    await deleteUser(id);
    res.status(204).send('User has been successful deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
