const express = require('express');
const rooms = require('../controllers/rooms');
const auths = require('../controllers/auths');
let router = express.Router();

router.param('id', function (req, res, next, id) {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send('invalid id');
  }
  return next();
});

router.route('/')
  // .get(rooms.getRooms)
  .post(auths.validateToken, rooms.createRoom)

router.get('/items', auths.validateToken, rooms.getItemsFromRoom);
router.put('/join', auths.validateToken, rooms.joinRoomByCode);

router.route('/:id')
  .get(auths.validateToken, rooms.getRoomById)
  .put(auths.validateToken, rooms.updateRoomById)
  .delete(auths.validateToken, rooms.deleteRoomById);

module.exports = router;