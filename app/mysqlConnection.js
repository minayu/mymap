var mysql = require('mysql');

var dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'banira-82',
  database: 'mapdata'
};

var connection = mysql.createConnection(dbConfig);

module.exports = connection;