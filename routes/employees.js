exports.show = function(req, res, next){

	req.getConnection(function(err, connection) {
		if (err) return next(err);
		connection.query('SELECT first_name, last_name FROM employees', [], function(err, results) {
			if (err) return next(err);
			res.render('employees',{
				no_products : results.length === 0,
				employees : results
			})
			
		})
	})
};

exports.showAddEmployees = function(req, res){
	req.getConnection(function(err, connection){
				if (err) return next(err);
		connection.query('SELECT * FROM employees', function(err, results) {
			res.render('home', {
				employees : results
			});
		});
	});
};

exports.addEmployees = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {

			first_name : input.first_name,
			last_name : input.last_name
      	
  	};
  	console.log(input);
		connection.query('insert into employees set ?', data, function(err, results) {
  		if (err) return next(err);

			res.redirect('/employees');
		});
	});
}; 

exports.get = function(req, res, next){
	var employee_id = req.params.employee_id;
	console.log(req.params);
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM employees WHERE employee_id = ?', [employee_id], function(err,rows){
			if(err) return next(err);
			res.render('editEmployees',{page_title:"Edit Customers - Node.js", data : rows[0]});
		});
	});
};

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
	
  	var employee_id = req.params.employee_id;
  	req.getConnection(function(err, connection){
		connection.query('UPDATE employees SET ? WHERE employee_id = ?', [data, employee_id], function(err, rows){
    		if (err) next(err);
         	res.redirect('/employees');
    		});

    });
};

exports.delete = function(req, res, next){
	var employee_id = req.params.employee_id;
	
	req.getConnection(function(err, connection){

		connection.query('DELETE FROM emlpoyees WHERE employee_id = ?', [employee_id], function(err,rows){
			if(err) return next(err);
			res.redirect('/emlpoyees');
		});
	});
};