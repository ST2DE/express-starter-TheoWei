var express = require('express');
var app = express();
var db = require('./models');
var validator = require('express-validator');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

app.use(validator());
app.use(flash());
app.use(cookieParser());
app.use(session({
    secret:'keyboard cat', //用亂數產生編號
    resave: false, //重新造訪是否會重新產生session
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname+'/public'));
app.set('view engine','ejs');
app.listen(3000, function() {
  db.sequelize.sync();
});

var routes = require('./routes')(app);