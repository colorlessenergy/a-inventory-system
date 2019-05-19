const Item = require('../models/schemas/item');

exports.getItems = function (req, res, next) {
  console.log('get items called');
  Item.find({}, function (err, items) {
    if (err) {
      return next(err);
    }

    return res.json(items)
  });
};

exports.getItemById = function (req, res, next) {
  console.log('get item by id called');
  Item.findById(req.params.id, function (err, item) {
    if (err) {
      return next(err);
    }
    if (!item) {
      return res.status(404).send('No item with that ID');
    }

    return res.json(item);
  });
}

exports.createItem = function (req, res, next) {
  console.log('create item called');
  // validate inputs
  if (typeof req.body.name !== 'string') {
    return res.status(400).send('Invalid item name');
  }

  let itemData = {};
  itemData.name = req.body.name;
  if (req.body.amount) {
    itemData.amount = req.body.amount;
  }

  let newItem = new Item(itemData);
  newItem.save(function (err, item) {
    if (err) {
      return next(err);
    }
    return res.sendStatus(200);
  });
};

exports.updateItemById = function (req, res, next) {
  console.log('update item by id called');
  // validate inputs
  let itemData = {};
  if (req.body.name) {
    itemData.name = req.body.name;
  }
  if (req.body.amount) {
    itemData.amount = req.body.amount;
  }

  Item.findByIdAndUpdate(req.params.id, itemData, { new: true, upsert: true}, function (err, item) {
    if (err) {
      return next(err);
    }
    if (!item) {
      return res.status(404).send('No item with that ID');
    }
    return res.sendStatus(200);
  });
};

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