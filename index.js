const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// db conn
const conn = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'root',
  database : 'nodemysql'
});
 
conn.connect();
 
// db query
conn.query('SELECT * FROM test', function (error, results, fields) {
  if (error) console.log(error);
  console.log(results);
});
 
conn.end();

app.get('/', (req, res) => res.send('hello world'));
app.listen(port, () => console.log(`example app listening on port http://localhost:${port}`));

