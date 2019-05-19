const express = require('express');
const rooms = require('../controllers/rooms');
let router = express.Router();

router.param('id', function (req, res, next, id) {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send('invalid id');
  }
  return next();
});

router.route('/')
  .get(rooms.getRooms)
  .post(rooms.createRoom)

router.route('/:id')
  .get(rooms.getRoomById)
  .put(rooms.updateRoomById)
  .delete(rooms.deleteRoomById)

module.exports = router;