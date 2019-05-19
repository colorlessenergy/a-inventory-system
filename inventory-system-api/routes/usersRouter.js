const express = require('express');
const users = require('../controllers/users');
let router = express.Router();

router.param('id', function (req, res, next, id) {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send('invalid id');
  }
  return next();
});

router.route('/')
  .get(users.getUsers)
  .post(users.createUser);

router.route('/:id')
  .get(users.getUserById)
  .put(users.updateUserById)
  .delete(users.deleteUserById);

module.exports = router;