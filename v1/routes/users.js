var express = require('express');
var router = require('express-promise-router')();
// var router = express.Router;

var UsersController = require('../controllers/users');

router.route('/signup')
	.post(UsersController.signUp);

router.route('/signin')
	.post(UsersController.signIn);

router.route('/secret')
	.get(UsersController.secret);

module.exports = router;