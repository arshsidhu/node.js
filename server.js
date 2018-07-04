//Setup our application
//Server.js

//#################
//Set up 
//#################

//tools
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

//#################
//Config
//#################

//connect to db
mongoose.connect(configDB.url)

//pass passport for configuration
//require('./config/passport')(passport); 

//set up express application

//log every request to the console
app.use(morgan('dev'));

//read cookies (needed for auth)
app.use(cookieParser());

//get information from html forms
app.use(bodyParser());

//set up ejs for templating
app.set('view engine', 'ejs')

//required for passport

//session secret
app.use(session({secret: 'michealjordanplayedagainsticecreamtruckdrivers'}))
app.use(passport.initialize());

//persistent login sessions
app.use(passport.session());

//use connect-flash for flash messages stored in session
app.use(flash());

//#################
//routes
//#################

//load routes and pass in app and passport
require('./app/routes.js')(app, passport);

//#################
//launch
//#################

app.listen(port);
console.log('swag port ' + port);