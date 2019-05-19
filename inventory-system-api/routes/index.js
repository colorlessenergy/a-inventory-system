const express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  return res.send('home page!');
});

module.exports = router;