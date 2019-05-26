const express = require('express');
const config = require('./models/config/config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
var app = express();

const auths = require('./controllers/auths');

app.use(express.static(path.join(__dirname, '../inventory-system-frontend/build')));

const routes = require('./routes/index');
const usersRouter = require('./routes/usersRouter');
const roomsRouter = require('./routes/roomsRouter');
const itemsRouter = require('./routes/itemsRouter');
const authsRouter = require('./routes/authsRouter');

// create req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(config.dbUrl, { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log('mongodb connection error', err);
  }
  console.log('connected to mongodb');
});

app.use(cors());

app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);
app.use('/items', itemsRouter);
app.use('/auth', authsRouter);

app.put('/logout', auths.validateToken, auths.logOutUser);

app.use('/', routes);

// development error handler
app.use(function (err, req, res, next) {
  console.log(err);
  return res.sendState(err.status || 500);
});

app.listen(config.PORT, function () {
  console.log('listening on port ' + config.PORT);
});