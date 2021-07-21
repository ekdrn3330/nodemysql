// modules
const express = require('express');
const mysql = require('mysql');
const bodyPaser = require('body-parser');
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
app.use(bodyPaser.json());
app.use(bodyParser.urlencoded({extended:true}));


// routes
app.get('/', function(req, res) {
  res.redirect('/contacts');
});
app.get('/contacts', function(req, res){
  conn.find({}, function(err, rows){
    if (err) return res.json(err);
    res.render('contacts/index', {contacts:contacts});
  });
});
app.get('/contacts/new', function(req, res){
  res.render('contacts/new');
});
app.post('/contacts', function(req, res){
  
});


// port setting
app.listen(port, () => console.log(`example app listening on port http://localhost:${port}`));




