// require('dotenv').config(); 

// var mysql = require('mysql');

// var pool = mysql.createPool({
//     host: process.env.DB_HOST || 'localhost',
//     port: process.env.DB_PORT || 3306,
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || 'password',
//     database: process.env.DB_DATABASE || 'flights',
//     connectionLimit: process.env.DB_CONNECTION_LIMIT || 100
// });

// module.exports = pool;

// pool.js

require('dotenv').config();

var mysql = require('mysql');

var pool = mysql.createPool({
    host: process.env.CLEVER_CLOUD_MYSQL_HOST || 'your-clever-cloud-host',
    port: process.env.CLEVER_CLOUD_MYSQL_PORT || 3306,
    user: process.env.CLEVER_CLOUD_MYSQL_USER || 'your-clever-cloud-user',
    password: process.env.CLEVER_CLOUD_MYSQL_PASSWORD || 'your-clever-cloud-password',
    database: process.env.CLEVER_CLOUD_MYSQL_DATABASE || 'your-clever-cloud-database',
    connectionLimit: process.env.DB_CONNECTION_LIMIT || 100
});

module.exports = pool;

