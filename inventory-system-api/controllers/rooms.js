const Room = require('../models/schemas/room');
const User = require('../models/schemas/user');
const mongoose = require('mongoose');

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
  console.log('createRoom called');
  console.log(req.body);

  // validate inputs
  let roomData = {};
  if (req.body.name) {
    roomData.name = req.body.name;
  }
  roomData.creator = req.user.id;
  console.log('creating new mongoose id');
  let mongooseId = new mongoose.mongo.ObjectId();
  roomData.code = mongooseId;
  console.log('roomData code', roomData.code);
  roomData.users = [req.user.id];

  let newRoom = new Room(roomData);
  newRoom.save(function (err, room) {
    if (err) {
      return next(err);
    }
    console.log('saved room', room);
    User.findById(req.user.id, function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(404).send('No user found with that ID');
      }
      console.log('found user', user);
      user.rooms.push(room.id);
      user.save(function (err, user) {
        if (err) {
          return next(err);
        }
        console.log('updated user', user);
        return res.json(room);
      });
    });
  });
};

/**
  look for a room and return its items
  @param {String} req.body.id - room id
  @return {Object} - items
*/

exports.getItemsFromRoom = function (req, res, next) {
  Room.findById(req.body.id)
    .populate('items')
    .exec(function (err, room) {
      if (err) {
        return next(err);
      }
      if (!room) {
        return res.status(404).send('No room with that ID');
      }
      console.log('populated room items', room);
      return res.json(room.items);
    });
};

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