const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Room = require('./room');
const config = require('../config/config');

let Schema = mongoose.Schema;
let userSchema = new Schema({
  email: { type: String, required: true, trim: true, unique: true },
  hash: { type: String, required: true },
  username: { type: String, trim: true, required: true, unique: true },
  rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
  token: String
});

// methods for validating password
userSchema.methods.comparePassword = function (pw, callback) {
  bcrypt.compare(pw, this.hash, function (err, isMatch) {
    console.log(pw, isMatch, "in compare password");
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

userSchema.pre('save', function (next) {
  let user = this;

  if (!user.email) {
    return next(new Error('Missing user email'));
  }
  if (!user.hash) {
    return next(new Error('Missing user password'));
  }
  if (!user.username) {
    return next(new Error('Missing username'));
  }

  // don't hash pw if hashed
  if (!user.isModified('hash')) {
    return next();
  }
  // hash pw
  bcrypt.genSalt(Number(config.saltRounds), function (err, salt) {
    if (err) {
      return next(err);
    }
    console.log('generated salt');
    console.log('salt', salt);
    console.log('pre user.hash', user.hash);
    bcrypt.hash(user.hash, salt, function (err, hash) {
      if (err) {
        console.log('bcrypt err');
        console.log(err);
        return next(err);
      }
      console.log('hashed pw and saved');
      user.hash = hash;
      console.log('hashed user.hash', user.hash);
      next();
    });
  });
});

let User = mongoose.model('User', userSchema);

module.exports = User;
