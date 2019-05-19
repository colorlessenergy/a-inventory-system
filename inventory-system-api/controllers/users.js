const User = require('../models/schemas/user');
const config = require('../models/config/config');

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

exports.createUser = function (req, res, next) {
  console.log('create user called');
  // validate inputs
  console.log(req.body);
  if (typeof req.body.email !== 'string') {
    return res.status(400).send('Invalid user email');
  }
  if (typeof req.body.password !== 'string') {
    return res.status(400).send('Invalid user password');
  }
  if (typeof req.body.username !== 'string') {
    return res.status(400).send('Invalid username');
  }
  // http://emailregex.com
  if (!req.body.email || !(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email))) {
    return res.status(400).send('Invalid user email');
  }

  let userData = {};
  userData.email = req.body.email;
  if (req.body.password) {
    userData.hash = req.body.password;
  }
  if (req.body.hash) {
    userData.hash = req.body.hash;
  }
  userData.username = req.body.username;

  let newUser = new User(userData);
  newUser.save(function (err, user) {
    console.log('saving');
    if (err) {
      console.log(err);
      if (err.code === 11000) {
        return res.status(400).send('User email or username already registered');
      }
    }
    console.log(user);
    return res.sendStatus(200);
  });
}

exports.updateUserById = function (req, res, next) {
  console.log('update user by id called');
  // validate inputs
  let userData = {};
  if (req.body.email) {
    userData.email = req.body.email;
  }
  if (req.body.password) {
    userData.hash = req.body.password;
  }
  if (req.body.hash) {
    userData.hash = req.body.hash;
  }
  // hash pw IFF theres a pw before updating since findByIdAndUpdate bypasses the mongoose pre 'save' hook
  if (req.body.hash) {
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
      });
    })
  }
  
  User.findByIdAndUpdate(req.params.id, userData, { new: true, upsert: true }, function (err, user) {
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