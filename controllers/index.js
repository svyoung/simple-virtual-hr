var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var connection = require('./mysql');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(require('./employee')); 

app.get('/', function(req, res) {
	var authenticated = false;
	connection.query('select employee_id, first_name, last_name, department, title, SUBSTR(last_name, 1,1) firstletter from employees order by last_name, first_name asc', function(err, rows, fields){
		var employees = rows;
		var emp_list = {};
		for(var i=0; i< employees.length; i++) {
			var key = employees[i].firstletter;
			var obj = {"id": employees[i].employee_id, "name": employees[i].last_name + ', '+ employees[i].first_name};
			var emp_name = emp_list[key] || [];
				emp_name.push(obj);
				emp_list[key] = emp_name;			

		}
		// console.log(emp_list);
		console.log('im in here?');

		res.render('index', {		
			'authenticated': authenticated,
			'employees': emp_list
		});
	});



}); 


module.exports = app;