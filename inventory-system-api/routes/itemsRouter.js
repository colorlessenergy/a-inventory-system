const express = require('express');
const items = require('../controllers/items');
let router = express.Router();

router.param('id', function (req, res, next, id) {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send('invalid id');
  }
  return next();
});

router.route('/')
  .get(items.getItems)
  .post(items.createItem);

router.route('/:id')
  .get(items.getItemById)
  .put(items.updateItemById)
  .delete(items.deleteItemById);

module.exports = router;