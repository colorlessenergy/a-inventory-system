const Room = require('../models/schemas/room');
const User = require('../models/schemas/user');
const mongoose = require('mongoose');

/**
  find a room
  @param {String} req.user.id - user id from token
  @param {String} req.params.id - room id
  @return {Object} - found room
*/
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

/**
  create a room
  @param {String} req.user.id - user id
  @param {Object} req.body - room data
    @param {String} req.body.name - room name
  @return {Object} - created room
*/
exports.createRoom = function (req, res, next) {
  console.log('createRoom called');
  console.log(req.body);
  console.log(!req.body.name);
  // **validate inputs
  let roomData = {};
  if (!req.body.name) {
    console.log('no room name');
    return res.status(400).send('Missing room name');
  }
  // **add room data to object to create new room
  roomData.name = req.body.name;
  roomData.creator = req.user.id;
  console.log('creating new mongoose id');
  let mongooseId = new mongoose.mongo.ObjectId();
  roomData.code = mongooseId;
  console.log('roomData code', roomData.code);
  roomData.users = [req.user.id];
  console.log('roomData', roomData);
  
  // **create room
  let newRoom = new Room(roomData);
  newRoom.save(function (err, room) {
    if (err) {
      return next(err);
    }
    console.log('saved room', room);
    // **add room to user's rooms
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
  find a room and return its items
  @param {String} req.headers.id - room id
  @return {Object} - items from room and room name
*/
exports.getItemsFromRoom = function (req, res, next) {
  console.log('GET /rooms/items called getItemsFromRoom');
  console.log('req.headers', req.headers);
  console.log('req.headers.id', req.header('id'));
  Room.findById(req.header('id'))
    .populate('items')
    .exec(function (err, room) {
      if (err) {
        return next(err);
      }
      if (!room) {
        return res.status(404).send('No room with that ID');
      }
      console.log('populated room items', room);
      let responseData = {
        roomName: room.name,
        items: room.items
      }
      console.log('updated res object to return that contains the items and room name');
      console.log(responseData);
      return res.json(responseData);
    });
};

/**
  Join a room and add the user to the rooms db
  @param {String} req.body.code - room code
  @param {String} req.user.id - user's id
  @return {Object} - found room
*/
exports.joinRoomByCode = function (req, res, next) {
  console.log('joinRoomByCode called');
  // **find room to join with code
  Room.findOne({code: req.body.code}, function (err, room) {
    if (err) {
      return next(err);
    }
    if (!room) {
      return res.status(404).send('No room with that code');
    }
    console.log('found room');
    console.log(room);
    console.log('checking if user is already in the room');
    let userIndex = room.users.findIndex(user => {
      console.log(user);
      console.log(typeof user._id, user._id);
      console.log(typeof req.user.id, req.user.id);
      return user._id == req.user.id;
    });
    console.log('userIndex', userIndex, userIndex === -1);
    // **join room iff not in it already
    if (userIndex == -1) {
      console.log('user is not in the room! add user to the room, save, and return room');
      room.users.push(req.user.id);
      room.save(function (err, room) {
        if (err) {
          return next(err);
        }
          console.log('saved room');
          return res.json(room);
      });
    } else {
      console.log('user is already in the room');
      return res.status(400).send('User is already in the room');
    }
  });
};

/**
  update a room
  @param {Object} req.body - room data
    @param {String} req.body.name - room name
  @return {Object} - response
*/
exports.updateRoomById = function (req, res, next) {
  console.log('update room by id called');
  // **validate inputs
  let roomData = {};
  if (req.body.name) {
    roomData.name = req.body.name;
  }

  Room.findByIdAndUpdate(req.params.id, roomData, { new: true }, function (err, room) {
    if (err) {
      return next(err);
    }
    if (!room) {
      return res.status(404).send('No room with that ID');
    }
    
    return res.sendStatus(200);
  });
}

/**
  delete a room, find user, delete the room id from there too
  @param {String} req.params.id - room id
  @return {Object} - response
*/
exports.deleteRoomById = function (req, res, next) {
  console.log('delete room by id called');
  Room.findByIdAndDelete(req.params.id, function (err, room) {
    if (err) {
      return next(err);
    }
    if (!room) {
      return res.status(404).send('No room with that ID');
    }

    User.findById(req.user.id, function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(404).send('No user with that ID');
      }

      let indexOfRoom = user.rooms.indexOf(String(room._id));
      
      if (indexOfRoom !== -1) {
      user.rooms.splice(indexOfRoom, 1);
      user.save(function (err, user) {
        if (err) {
          return next(err);
        }

        return res.sendStatus(200);
      });
      }
      else {
        return res.sendStatus(200);  
      }
    });
  });
}

// ======================
// DEV controllers
// ======================

// exports.getRooms = function (req, res, next) {
//   console.log('get rooms called');
//   Room.find({}, function (err, rooms) {
//     if (err) {
//       return res.json(err);
//     }

//     return res.json(rooms);
//   })
// }