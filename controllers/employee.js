var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var connection = require('./mysql');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/employee/all/namelist', function(req, res) {
	connection.query('select employee_id, first_name, last_name, SUBSTR(last_name, 1,1) firstletter from employees order by last_name, first_name asc', function(err, rows, fields){
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

		res.setHeader('Content-Type', 'application/json');
    	res.json(emp_list);
	});
});


app.get('/employee/:id', function(req, res) {
	var empId = req.params.id;

	connection.query("select * from employees t1 join employee_time_off t2 on t1.employee_id = t2.employee_id where t1.employee_id = ?", empId, function(err, rows){
		if(err) throw err;
    	console.log(rows);
		res.setHeader('Content-Type', 'application/json');
    	res.json(rows);
  		// res.send(JSON.stringify(rows));
	});
	
	// next();

});

app.get('/employee/all/departments', function(req, res){

	connection.query("select * from employees order by department", function(err, rows){
		if(err) throw err;
    	console.log(rows);
		res.setHeader('Content-Type', 'application/json');
    	res.json(rows);
	});
});

app.get('/employee/fnln/:word', function(req, res) {

	connection.query("select employee_id, first_name, last_name from employees where first_name LIKE ? or last_name LIKE ?", [req.params.word + '%', req.params.word + '%'], function(err, rows){
		if(err) throw err;
    	console.log(rows);
		res.setHeader('Content-Type', 'application/json');
		res.json(rows);
	});
	
}); 




module.exports = app;