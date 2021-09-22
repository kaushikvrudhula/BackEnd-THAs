var express = require('express');
var router = express.Router();
var registerInitialCheck = require('../middleware/registerChecks')
var register = require("../controllers/register")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/** 
 * @requires { email , firstName, lastName , password , confirmPassword } - req.body
 * @description 
 * Security , performance and edge cases
 * email validate 
 * password validate 
 * password==confirm
 * js / sql - THA
 * check if email already exists
 * password hash
 * email lowercase
**/
router.post('/register',registerInitialCheck , register);
module.exports = router;
