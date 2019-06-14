const express = require('express');
let router = express.Router();

const auths = require('../controllers/auths');

router.route('/token')
  .post(auths.loginUser)
  .delete(auths.validateToken, auths.logOutUser);

module.exports = router;