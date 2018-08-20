var db = require('../models');

module.exports = function(app) {
	// Get request to find all employees & their contact info in database (view this whole table)
	app.get('/api/employees', function(req, res) {
		db.EmployeeTable.findAll({}).then(function(dbEmployeeTable) {
			res.json(dbEmployeeTable);
		});
	});

	//Get request to find all available and unavailable times posted by employees (view whole avail table)
	app.get('/api/employees', function(req, res) {
		db.AvailTable.findAll({}).then(function(dbAvailTable) {
			res.json(dbAvailTable);
		});
	});

	//Get request to get schedule (all shifts for the day/week)
	app.get('/api/employees', function(req, res) {
		db.AvailTable.findAll({}).then(function(dbAvailTable) {
			res.json(dbAvailTable);
		});
	});





	
	//post request to post user data to database
	app.post('/api/employees', function(req, res) {

	//posting user data to Employee table
		db.EmployeeTable.create({
			firstName: req.body.firstName,
			lastName : req.body.lastName,
			isAdmin: req.body.isAdmin,
			email: req.body.email,
			phone: req.body.phone,
			picture: req.body.picture
			
		}).then(function(dbEmployeeTable){
			res.json(dbEmployeeTable);
		});
	});

	//posting user data to Avail table 
	app.post('/api/avail', function(req, res){
		console.log(req.body.id);
		db.AvailTable.create({
			date: req.body.date,
			startTime: req.body.startTime,
			endTime: req.body.endTime,
			avail: req.body.avail,
			EmployeeTableId: parseInt(req.body.id)

		}).then(function(dbAvailTable){
			res.json(dbAvailTable);
		});
			

	});

	//posting user data to Schedule table (need a get not a post if the data in this table is the same as the data in the avail table)
	app.post('/api/schedule', function(req, res){
		db.ScheduleTable.create({
			date: req.body.date,
			start: req.body.start,
			end: req.body.end,
			EmployeeTableId: req.body.id	
		}).then(function(dbScheduleTable){
			res.json(dbScheduleTable);
		});
	});
			

	




	// Delete an employee by id
	app.delete('/api/employees/:id', function(req, res) {
		db.EmployeeTable.destroy({ where: { id: req.params.id } }).then(function(dbEmployeeTable) {
			res.json(dbEmployeeTable);
		});
	});


	// Delete an availability time by id
	app.delete('/api/avail/:id', function(req, res) {
		db.AvailTable.destroy({ where: { id: req.params.id } }).then(function(dbAvailTable) {
			res.json(dbAvailTable);
		});
	});

	// Delete a schedule by id
	app.delete('/api/schedule/:id', function(req, res) {
		db.ScheduleTable.destroy({ where: { id: req.params.id } }).then(function(dbScheduleTable) {
			res.json(dbScheduleTable);
		});
	});





	
	//update an employees info by id
	app.put('/api/employees/:id', function(req, res) {
		db.EmployeeTable.update({firstName: req.body.firstName},{
			where: {id: req.params.id}}).then(function(dbEmployeeTable) {
			res.json(dbEmployeeTable);
		});
	});
	//update availability by id
	app.put('/api/avail', function(req, res) {
		db.AvailTable.update(req.body,{
			where: {id: req.body.id}}).then(function(dbAvailTable) {
			res.json(dbAvailTable);
		});
	});
	//update schedule for day/week by id
	app.put('/api/schedule', function(req, res) {
		db.ScheduleTable.update(req.body,{
			where: {id: req.body.id}}).then(function(dbScheduleTable) {
			res.json(dbScheduleTable);
		});
	});






};
