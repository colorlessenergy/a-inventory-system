const Room = require('../models/schemas/room');

exports.getRooms = function (req, res, next) {
  console.log('get rooms called');
  Room.find({}, function (err, rooms) {
    if (err) {
      return res.json(err);
    }

    return res.json(rooms);
  })
}

exports.getRoomById = function (req, res, next) {
  console.log('get room by id called');
  Room.findById(req.params.id, function (err, room) {
    if (err) {
      return next(err);
    }
    if (!room) {
      return res.status(404).send('No room with that ID');
    }

    return res.json(room);
  });
}

exports.createRoom = function (req, res, next) {
  console.log('create room called');
  // validate inputs
  let roomData = {};
  if (req.body.name) {
    roomData.name = req.body.name;
  }

  let newRoom = new Room(roomData);
  newRoom.save(function (err) {
    if (err) {
      return next(err);
    }
    return res.sendStatus(200);
  })
}

exports.updateRoomById = function (req, res, next) {
  console.log('update room by id called');
  // validate inputs
  let roomData = {};
  if (req.body.name) {
    roomData = req.body.name;
  }

  Room.findByIdAndUpdate(req.params.id, roomData, {new: true, upsert: true}, function (err, room) {
    if (err) {
      return next(err);
    }
    if (!room) {
      return res.status(404).send('No room with that ID');
    }
    
    return res.sendStatus(200);
  });
}

exports.deleteRoomById = function (req, res, next) {
  console.log('delete room by id called');
  Room.findByIdAndDelete(req.params.id, function (err, room) {
    if (err) {
      return next(err);
    }
    if (!room) {
      return res.status(404).send('No room with that ID');
    }
    
    return res.sendStatus(200);
  });
}