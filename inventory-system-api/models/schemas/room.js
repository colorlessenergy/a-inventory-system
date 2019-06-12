const mongoose = require('mongoose');
const Item = require('./item');
const User = require('./user');

let Schema = mongoose.Schema;
let roomSchema = new Schema({
  code: String,
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  name: {type: String, required: true},
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

roomSchema.pre('save', function (next) {
  if (!this.name) {
    return res.status(400).send('Missing room name');
  }
  next();
});

let Room = mongoose.model('Room', roomSchema);

module.exports = Room;