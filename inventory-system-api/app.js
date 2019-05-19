const express = require('express');
const config = require('./models/config/config');
var app = express();

const routes = require('./routes/index');
app.use('/', routes);

app.listen(config.PORT, function () {
  console.log('listening on port ' + config.PORT);
});