
'use strict';
var express = require('express'),
    exphbs  = require('express-handlebars'),
    mysql = require('mysql'),
 	myConnection = require('express-myconnection'),
 	bodyParser = require('body-parser'),
    employees = require('./routes/employees');

var app = express();
var dbOptions = {
    host: 'localhost',
    user: 'root',
    password: 'coder123',
    port: 3306,
    database: 'Creative_hair'
};

//setup template handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}


//setup the handlers
// app.get('/', function(req, res){
//     res.render('index');
// });
app.get('/employees', employees.show);
app.get('/employees/editEmployees/:employee_id', employees.get);
app.post('/employees/update/:employee_id', employees.update);
app.get('/employees/add', employees.showAddEmployees);
app.post('/employees/add', employees.addEmployees);

app.get('/employees/delete/:employee_id', employees.delete);

 app.use(errorHandler);

//configure the port number using and environment number
var portNumber = process.env.CRUD_PORT_NR || 3000;

//start everything up
app.listen(portNumber, function () {
    console.log('Create, Read, Update, and Delete (CRUD) example server listening on:', portNumber);
});
 	