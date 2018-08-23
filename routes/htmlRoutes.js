var db = require('../models');

module.exports = function (app) {
	// Checks incoming request to see if user is logged in. If not it will redirect to login handlebars with a message
	function checkAuthentication(req, res, next) {
		if (req.isAuthenticated()) {
			//req.isAuthenticated() will return true if user is logged in
			next();
		} else{
			res.render('login', {layout: 'mainlogin', error: 'You have to be sign in.'});
		}
	}
	
	// GET: /auth/login
	// Load Login
	app.get('/', (req, res) => {
		res.render('login', {layout: 'mainlogin'});
	});


	// GET: /
	// Load index page
	app.get('/main', checkAuthentication, function (req, res) {
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

	app.get('/hello', function (req, res) {
		var context = { title: 'My New Post', body: 'This is my first post!' };
		res.render('index', context);
	});

	app.get('/create', (req, res) => {
			res.render('create');
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
