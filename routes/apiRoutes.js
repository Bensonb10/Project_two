var db = require('../models');

module.exports = function(app) {

	//GET ROUTES

	// Get request to get all employees
	app.get('/api/employees', function(req, res) {
		db.EmployeeTable.findAll({}).then(function(dbEmployeeTable) {
			res.json(dbEmployeeTable);
		});
	});

	//Get request to find all available and unavailable times posted by employees (view whole avail table)
	app.get('/api/avail', function(req, res) {
		db.AvailTable.findAll({}).then(function(dbAvailTable) {
			res.json(dbAvailTable);
		});
	});

	//Get request to get schedule (all shifts for the day/week)
	app.get('/api/schedule', function(req, res) {
		db.ScheduleTable.findAll({}).then(function(dbScheduleTable) {
			res.json(dbScheduleTable);
		});
	});

	app.get('/api/getAll', function (req, res) {

		db.EmployeeTable.findAll({
			include: [{
				model: db.ScheduleTable,
			}, {
				model: db.AvailTable
			}]
		}).then(function (all) {
			res.json(all);
		});
	});
	
	//POST ROUTES

	app.post('/api/schedule/update', function () {
		console.log(req.body);
	});

	
	//post request to post user data to database
	app.post('/api/employees', function(req, res) {

	//posting user data to Employee table
		db.EmployeeTable.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			isAdmin: req.body.isAdmin,
			email: req.body.email,
			phone: req.body.phone,
			picture: req.body.picture
			
		}).then(function(dbEmployeeTable){
			res.json(dbEmployeeTable);
		});
	});

	//This will post new shifts to the avail table and will also contain an employees id
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

	app.put('/api/schedule/:id', function(req,res){
		db.ScheduleTable.update(
			{
				date: req.body.date,
				dayOfWeek: req.body.dayOfWeek,
				start: req.body.start,
				end: req.body.end,
				EmployeeTableId: req.body.employeeTableId
			},{
				where: {
					id: req.params.id
				}
			}
		).then(function (result) {
			res.json(result);
		})
	})


			
	app.get('/api/getAll', function(req,res){
		db.EmployeeTable.findAll({
			include: [{
				model: db.ScheduleTable
			},{
				model: db.AvailTable
			}]
		}).then(function(all){
			var hbsObj = {
				employees: all
			};
			res.send(all);
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

	// Delete a schedule by idShift
	app.delete('/api/schedule/:id', function(req, res) {
		db.ScheduleTable.destroy({ where: {id: req.params.id} }).then(function(dbScheduleTable) {
			res.json(dbScheduleTable);
		});
	});


	//UPDATE ROUTES


	//update an employees info by id
	app.put('/api/employees/:id', function(req, res) {
		db.EmployeeTable.update(
			{
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				isAdmin: req.body.isAdmin,
				email: req.body.email,
				phone: req.body.phone,
				picture: req.body.picture
			},
			{
				where: {
					id: req.body.id
				}
			}
		).then(function(employeeData) {
			res.json(employeeData);
		});
	});
	


	//update availability table with an employees start and end shifts 
	app.put('/api/avail/:id', function(req, res) {
		db.AvailTable.update(
			{
				startTime: req.body.startTime,
				endTime: req.body.endTime,
				avail: req.body.avail
			},
			{
				where: {
					id: req.body.id
				}
			}
		).then(function(availData) {
			res.json(availData);
		});
	});

	//update schedule table with an employees start and end shifts
	// app.put('/api/schedule/', function(req, res) {
	// 	console.log(req.body.EmployeeTableId);
	// 	db.ScheduleTable.create({

	// 	}).then(function(schedData) {
	// 		console.log(schedData);
	// 		res.json(schedData);
	// 	});
	// });

	app.post('/api/schedule', (req, res) => {
		db.ScheduleTable.create({
			date: req.body.date,
			dayOfWeek: req.body.dayOfWeek,
			start: req.body.start,
			end: req.body.end,
			EmployeeTableId: req.body.employeeTableId
		}).then((dbScheduleTable) => {
			res.json(dbScheduleTable)
		});
	});


};