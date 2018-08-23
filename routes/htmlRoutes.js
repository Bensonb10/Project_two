var db = require('../models');

module.exports = function (app) {
	// Checks incoming request to see if user is logged in. If not it will redirect to login handlebars with a message
	function checkAuthentication(req, res, next) {
		if (req.isAuthenticated()) {
			//req.isAuthenticated() will return true if user is logged in
			next();
		} else{
			res.render('login', {error: 'You have to be sign in.'});
		}
	}

	
	app.get('/', checkAuthentication, function (req, res) {
		db.ScheduleTable.findAll({include: db.EmployeeTable}).then((data) => {
			var hbsObj = {
				shifts: data
			};
			res.render('index', hbsObj);
		});
	});

	
	app.get('/auth/register', checkAuthentication, (req, res) => {
		res.render('register');
	});

	
	app.get('/auth/login', (req, res) => {
		res.render('login');
	});

	app.get('/hello', function (req, res) {
		var context = { title: 'My New Post', body: 'This is my first post!' };
		res.render('index', context);
	});

	app.get('/create', (req, res) => {
		db.AvailTable.findAll({include: db.EmployeeTable}).then((dbResult) => {
			
			let monday = dbResult.filter((x) => x.date === '2018-08-20' && x.avail);
			// console.log(monday[0].EmployeeTable);
			let tuesday = dbResult.filter((x) => x.date === '2018-08-21' && x.avail);
			let hbsObj = {
				monday: monday,
				tuesday: tuesday
			};
			res.render('create', hbsObj);
			
		});
	});

	app.post('/create', checkAuthentication, (req, res) => {
		let currentDate = '2018-08-22';
		let startShift = '0900';
		let endShift = '2100';
		db.ScheduleTable.create({
			date: currentDate,
			start: startShift,
			end: endShift
		}).then((dbScheduleTable) => {
			req.flash('success_msg', 'Created a new shift');
			res.redirect('/create');
		});
	});
};
