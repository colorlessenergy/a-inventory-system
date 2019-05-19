const express = require('express');
const config = require('./models/config/config');
const mongoose = require('mongoose');
var app = express();

const routes = require('./routes/index');

mongoose.connect(config.dbUrl, { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log('mongodb connection error', err);
  }
  console.log('connected to mongodb');
});

app.use('/', routes);

// development error handler
app.use(function (err, req, res, next) {
  console.log(err);
  return res.sendState(err.status || 500);
});

app.listen(config.PORT, function () {
  console.log('listening on port ' + config.PORT);
});