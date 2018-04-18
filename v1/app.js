var express = require("express");
var morgan = require("morgan");
var bodyParser= require("body-parser");

var app = express();

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
//Routes
app.use('/users', require('./routes/users'));
//Start the server

var port = process.env.PORT || 3000;

app.listen(port);
console.log('Server listening at ' + port);