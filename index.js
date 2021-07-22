// modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


// db setting
const conn = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'root',
  database : 'nodemysql'
});
 
conn.connect();
 
// other setting
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// routes
app.get('/', (req, res) => res.redirect('/contacts'));
app.get('/contacts', (req, res) => res.render('contacts/index'));
app.post('/', function(req, res) {
  var sql = 'INSERT INTO user SET ?';

  conn.query(sql, req.body, function(err, results, fields) {
    if (err) throw err;
    console.log(results);
    res.redirect('/getlist');
  });
});
app.get('/getlist', function(req, res) {
  var sql = "SELECT * FROM user";

  conn.query(sql, function(err, results, fields) {
    if (err) throw err;
    res.render('contacts/getlist', {users : results});
  });
});
app.get('/delete/:id', function(req, res) {
  var sql = 'DELETE FROM user WHERE num = ?';

  conn.query(sql, [req.params.id], function(err, results, fields) {
    if (err) throw err;
    console.log(results);
    res.redirect('/getlist');
  });
});
app.get('/update/:id', function(req, res) {
  var sql = 'SELECT * FROM user WHERE num = ?';

  conn.query(sql, [req.params.id], function(err, results, fields) {
    if (err) throw err;
    console.log(results);
    res.render('contacts/update', {users : results});
  });
});



// port setting
app.listen(port, () => console.log(`example app listening on port http://localhost:${port}`));




