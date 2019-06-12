const User = require('../models/schemas/user');
const config = require('../models/config/config');
const bcrypt = require('bcrypt');

exports.getUsers = function (req, res, next) {
  console.log('get users called');
  User.find({}, function (err, users) {
    if (err) {
      return next(err);
    }

    return res.json(users);
  })
};

exports.getUserById = function (req, res, next) {
  console.log('get user by id called');
  User.findById(req.params.id, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(404).send('No user with that ID');
    }

    return res.json(user);
  });
}

/**
  Create a user and save it to the db
  @param {String} req.body.username - username
  @param {String} req.body.email - user email
  @param {String} req.body.password - user password
  @return {Object} - 200 status
*/

exports.createUser = function (req, res, next) {
  console.log('createUser called');
  // validate inputs
  console.log(req.body.username, typeof req.body.username);
  console.log(req.body.email, typeof req.body.email);
  console.log(req.body.password, typeof req.body.password);

  if (typeof req.body.username !== 'string') {
    console.log('username is not a string');
    console.log(req.body.username, typeof req.body.username);

    return res.status(400).send('Invalid username');
  }
  if (typeof req.body.email !== 'string') {
    console.log('email is not a string');
    console.log(req.body.email, typeof req.body.email);

    return res.status(400).send('Invalid user email');
  }
  if (req.body.password && typeof req.body.password !== 'string') {
    console.log('password is not a string');
    console.log(req.body.password, typeof req.body.password);

    return res.status(400).send('Invalid user password');
  }
  if (req.body.hash && typeof req.body.hash !== 'string') {
    console.log('hash is not a string');
    console.log(req.body.hash, typeof req.body.hash);

    return res.status(400).send('Invalid user password');
  }

  // http://emailregex.com
  if (!req.body.email || !(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email))) {
    console.log('email did not pass regex test');
    console.log(req.body.email, typeof req.body.hash);
    
    return res.status(400).send('Invalid user email');
  }

  // adding data to an object to create a user
  let userData = {};
  userData.username = req.body.username;
  userData.email = req.body.email;
  if (req.body.password) {
    userData.hash = req.body.password;
  }
  if (req.body.hash) {
    userData.hash = req.body.hash;
  }

  let newUser = new User(userData);

  console.log('saving user to db');
  
  newUser.save(function (err, user) {
    if (err) {
      console.log('ERR in saving user');
      console.log(err.code);
      if (err.code === 11000) {
        return res.status(400).send('User email or username already registered');
      }
      return next(err);
    }
    console.log('user created');
    console.log(user);
    return res.sendStatus(200);
  });
}

exports.getUserRooms = function (req, res, next) {
  console.log('getUserRooms called');
  User.findById(req.user.id)
    .populate('rooms')
    .exec(function (err, user) {
      if (err) {
        return next(err);
      }
      console.log('populated user rooms');
      console.log(user);
      return res.json(user.rooms);
    });
}

exports.updateUserById = function (req, res, next) {
  console.log('update user by id called');
  // validate inputs
  let userData = {};
  if (req.body.email) {
    userData.email = req.body.email;
  }

  if (req.body.username) {
    userData.username = req.body.username;
  }

  if (req.body.password) {
    userData.hash = req.body.password;
  }

  if (req.body.hash) {
    userData.hash = req.body.hash;
  }

  // hash pw IFF theres a pw before updating since findByIdAndUpdate bypasses the mongoose pre 'save' hook
  if (userData.hash) {
    bcrypt.genSalt(config.saltRounds, function (err, salt) {
      if (err) {
        return next(err);
      }

      bcrypt.hash(userData.hash, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        // store hashed pw in userData object
        userData.hash = hash;

        User.findByIdAndUpdate(req.user.id, userData, { new: true, upsert: true }, function (err, user) {
          if (err) {
            if (err.code === 11000) {
              return res.status(400).send('User email or username already registered');
            }
            return next(err);
          }
          if (!user) {
            return res.status(404).send('No user with that ID');
          }
          return res.sendStatus(200);
        });
      });
    })
  }
}

exports.deleteUserById = function (req, res, next) {
  console.log('delete user by id called');
  User.findByIdAndDelete(req.params.id, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(404).send('No user with that ID');
    }
    return res.sendStatus(200);
  });
}