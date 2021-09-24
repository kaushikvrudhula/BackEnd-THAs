var express = require('express');
const { Pool } = require('pg');
var router = express.Router();

/* GET users listing. */
const pool = new Pool({
  user:'postgres',
  host:'postgres',
  database: 'postgres',
  password: '123456',
  passwordport: 5432
})
router.get('/', function(req, res, next) {
  pool.query('SELECT * FROM "Users"',(err,result) => {
    if(err){
      throw err;
    
    }
    res.status(200).json(result)
  })
});

module.exports = router;
