const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersService.getUser(id);
    if (!user) {
      return res.status(404);
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { login, name, password } = req.body;
    const user = await usersService.createUser(
      new User({
        login,
        name,
        password,
      })
    );
    return res.status(201).json(User.toResponse(user));
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = req.body;
    const user = await usersService.updateUser(id, updatedUser);
    if (!user) {
      return res.status(404);
    }
    return res.status(200).json(User.toResponse(user));
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const { id } = req.params;
    await usersService.deleteUser(id);
    res.status(204).send('User has been successful deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
