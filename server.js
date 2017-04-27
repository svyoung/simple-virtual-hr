var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

// set the view engine to ejs
app.engine('.html', require('ejs').__express);
app.set('views', __dirname);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/index'));

app.listen(9090);

module.exports = app;