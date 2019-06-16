const express = require('express');
const users = require('../controllers/users');
const auths = require('../controllers/auths');

let router = express.Router();

router.param('id', function (req, res, next, id) {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send('invalid id');
  }
  return next();
});

router.route('/rooms')
  .get(auths.validateToken, users.getUserRooms);

router.route('/')
  // .get(users.getUsers)
  .post(users.createUser)
  .put(auths.validateToken, users.updateUserById);

// router.route('/:id')
  // .get(users.getUserById)
  // .delete(users.deleteUserById);

module.exports = router;