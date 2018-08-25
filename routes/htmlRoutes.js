var db = require('../models');

module.exports = function (app) {
	// Checks incoming request to see if user is logged in. If not it will redirect to login handlebars with a message
	function checkAuthentication(req, res, next) {
		if (req.isAuthenticated()) {
			//req.isAuthenticated() will return true if user is logged in
			next();
		} else{
			res.render('login', {layout: 'mainlogin', error: 'You have to be signed in.'});
		}
	}
	
	// GET: /
	// Load Login
	app.get('/', (req, res) => {
		res.render('login', {layout: 'mainlogin'});
	});


	// GET: /main
	// Load index page
	app.get('/main', checkAuthentication, function (req, res) {
		db.ScheduleTable.findAll({include: db.EmployeeTable}).then((data) => {
			var hbsObj = {
				shifts: data
			};
			res.render('create');
		});
	});

	// GET: /auth/register
	// Load register page
	app.get('/auth/register', (req, res) => {
		res.render('register');
	});

	app.get('/hello', function (req, res) {
		var context = { title: 'My New Post', body: 'This is my first post!' };
		res.render('index', context);
	});

	// GET: /create
	// Load create page
	app.get('/create', checkAuthentication, (req, res) => {
			res.render('create');
	});
};
