var db = require('../models');

module.exports = function(app) {
	// Get request to get all employees
	app.get('/api/employees', function(req, res) {
		db.EmployeeTable.findAll({}).then(function(dbEmployeeTable) {
			res.json(dbEmployeeTable);
		});
	});

	app.get('/api/schedule', function(req, res){
		db.ScheduleTable.findAll({}).then(function(dbScheduleTable) {
			res.json(dbScheduleTable);
		});
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
			res.json(all);
		})
	})

	// Delete an employee by id
	app.delete('/api/employees/:id', function(req, res) {
		db.EmployeeTable.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
			res.json(dbExample);
		});
	});


	// Delete an avail by id
	app.delete('/api/avail/:id', function(req, res) {
		db.AvailTable.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
			res.json(dbExample);
		});
	});

	// Delete an schedule by id
	app.delete('/api/schedule/:id', function(req, res) {
		db.ScheduleTable.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
			res.json(dbExample);
		});
	});

	app.put('/api/schedule/:id', function(req, res) {
		db.ScheduleTable.update(
			{
				start: req.body.start,
				end: req.body.end,
			},
			{
				where: {
					id: req.body.id
				}
			}
		).then(function(schedData) {
			console.log(schedData);
			res.json(schedData);
		});
	});


};
