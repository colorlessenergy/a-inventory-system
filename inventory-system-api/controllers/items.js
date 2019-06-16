const Item = require('../models/schemas/item');
const Room = require('../models/schemas/room');

/**
  Create an item and save it to the db
  find its room and save that item id to that room
  @param {String} req.body.name - item name
  @param {String} req.body.amount - item amount
  @param {String} req.body.id - room id
  @return {Object} - created item
*/
exports.createItem = function (req, res, next) {
  console.log('create item called');
  // **validate inputs
  if (typeof req.body.name !== 'string') {
    return res.status(400).send('Invalid item name');
  }
  if (typeof req.body.id !== 'string') {
    return res.status(400).send('Invalid room ID');
  }
  let itemData = {};
  itemData.name = req.body.name;
  if (req.body.amount && typeof req.body.amount === 'string') {
    console.log('have an item amount', req.body.amount);
    itemData.amount = Number(req.body.amount);
    console.log('converted item amount to number', itemData.amount);

    if (Number.isNaN(itemData.amount)) {
      console.log('item amount is NaN', itemData.amount);
      return res.status(400).send('invalid item amount');
    }
    console.log('passed item amount number check', itemData.amount);
    itemData.amount = req.body.amount;
  }

  // **create and save new item
  let newItem = new Item(itemData);
  newItem.save(function (err, item) {
    if (err) {
      return next(err);
    }
    console.log('item saved', item);
    console.log('finding room');
    
    // **find room to add new item to it's items
    Room.findById(req.body.id, function (err, room) {
      if (err) {
        return next(err);
      }
      if (!room) {
        return res.status(404).send('No room with that ID');
      }
      console.log('found room', room);
      room.items.push(item.id);
      console.log('added item to room', room);
      
      // **save room and return item
      room.save(function (err, room) {
        if (err) {
          return next(err);
        }
        console.log('saved room');
        return res.json(item);
      });
    });
  });
};

/**
  Update an item and save it to the db
  @param {String} req.body.name - item name
  @param {String} req.body.amount - item amount
  @param {String} req.params.id - item id
  @return {Object} - updated item
*/
exports.updateItemById = function (req, res, next) {
  console.log('updateItemById called');

  // **validate inputs
  let itemData = {};
  if (req.body.name) {
    if (typeof req.body.name === 'string') {
      itemData.name = req.body.name;
    } else {
      return res.status(400).send('Invalid item name');
    }
  }
  if (req.body.amount) {
    if (typeof req.body.amount === 'string') {
      console.log('have an item amount', req.body.amount);
      itemData.amount = Number(req.body.amount);
      console.log('converted item amount to number', itemData.amount);

      if (Number.isNaN(itemData.amount)) {
        console.log('item amount is NaN', itemData.amount);
        return res.status(400).send('invalid item amount');
      }
      console.log('passed item amount number check', itemData.amount);
      itemData.amount = req.body.amount;
    } else {
      return res.status(400).send('Invalid item Amount');
    }
  }

  // **find item and update it with itemData
  Item.findByIdAndUpdate(req.params.id, itemData, { new: true, upsert: true }, function (err, item) {
    if (err) {
      return next(err);
    }
    if (!item) {
      return res.status(404).send('No item with that ID');
    }
    return res.json(item);
  });
};

/**
  Delete an item from db
  @param {String} req.params.id - item id
  @return {Object} - response
*/
exports.deleteItemById = function (req, res, next) {
  console.log('delete item by id called');
  Item.findByIdAndDelete(req.params.id, function (err, item) {
    if (err) {
      return next(err);
    }
    if (!item) {
      return res.status(404).send('No item with that ID');
    }

    return res.sendStatus(200);
  });
};


// ======================
// DEV controllers
// ======================

// exports.getItems = function (req, res, next) {
//   console.log('get items called');
//   Item.find({}, function (err, items) {
//     if (err) {
//       return next(err);
//     }

//     return res.json(items)
//   });
// };

// exports.getItemById = function (req, res, next) {
//   console.log('get item by id called');
//   Item.findById(req.params.id, function (err, item) {
//     if (err) {
//       return next(err);
//     }
//     if (!item) {
//       return res.status(404).send('No item with that ID');
//     }

//     return res.json(item);
//   });
// }