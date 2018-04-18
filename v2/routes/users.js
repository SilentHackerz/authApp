var express = require('express');
var router = require('express-promise-router')();
var { validateBody, schemas} = require('../helpers/routeHelpers')
// var router = express.Router;

var UsersController = require('../controllers/users');
//validation||Email & password
router.route('/signup')
	.post(validateBody(schemas.authSchema), UsersController.signUp);
//Doesnot require validation||passport does that
router.route('/signin')
	.post(UsersController.signIn);

router.route('/secret')
	.get(UsersController.secret);

module.exports = router;