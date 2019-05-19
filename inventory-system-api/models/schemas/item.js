const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let itemSchema = new Schema({
  amount: { type: Number, default: 1, trim: true },
  name: { type: String, required: true }
});

itemSchema.pre('save', function (next) {
  if (!this.name) {
    return next(new Error('Missing item name'));
  }

  next();
});

let Item = mongoose.model('Item', itemSchema);

module.exports = Item;

