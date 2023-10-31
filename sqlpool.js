var mysql = require('mysql');

var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'pass1',
    database : 'fb1'
});

exports.pool = pool;