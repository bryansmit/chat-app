const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: 'password',
})

mysqlConnection.connect((err) => {
  if (err) throw err;

  console.log('Connected to MySQL');
});