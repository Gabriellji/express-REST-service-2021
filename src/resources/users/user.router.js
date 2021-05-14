const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.getUser(id);
    if (!user) {
      return res.status(404);
    }
   return res.status(200).json(user);
});

router.route('/').post(async (req, res) => {
  const { login, name, password } = req.body;
  const user = await usersService.createUser(
    new User({
      login,
      name,
      password
    })
  );
  res.status(201).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  const user = await usersService.updateUser(id, updatedUser);
  if (!user) {
    return res.status(404);
  }
  return res.status(200).json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  await usersService.deleteUser(id);
  res.status(204).send('User has been successful deleted');
});

module.exports = router;
