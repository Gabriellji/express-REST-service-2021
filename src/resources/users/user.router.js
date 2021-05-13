const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
    const userId = req.params.id;
    const user = await usersService.getUser(userId);
    if (!user) {
      return res.status(404);
    }
   return res.status(201).json(User.toResponse(user));
});

// router.route('/').post(async (req, res) => {
//   const user = new User();
// })

module.exports = router;
