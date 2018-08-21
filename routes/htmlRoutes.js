var db = require('../models');

module.exports = function (app) {
	// Checks incoming request to see if user is logged in. If not it will redirect to login handlebars with a message
	function checkAuthentication(req,res,next){
		if(req.isAuthenticated()){
			//req.isAuthenticated() will return true if user is logged in
			next();
		} else{
			res.render("login", {error_msg: "You have to be sign in."});
		}
	}

	// Load index page
	app.get('/', checkAuthentication, function (req, res) {
		// db.Example.findAll({}).then(function(dbExamples) {
		// 	res.render('index', {
		// 		msg: 'Welcome!',
		// 		examples: dbExamples
		// 	});
		// });

		db.EmployeeTable.findAll({}).then(function(data){
			
			res.render('index', {
				msg: 'Welcome!',
				data: data
			});
		});
	});

	app.get('/schedule', function(req, res){
		db.ScheduleTable.findAll({}).then((data)=>{
			// var json = JSON.parse(data);
			res.render('index', {shift: data});
		});
	});

	// app.get('/auth/register', checkAuthentication, (req, res) => {
	// 	res.render('register')
	// });
	app.get('/auth/register', (req, res) => {
		res.render('register');
	});

	app.get('/auth/login', (req, res) => {
		res.render('login');
	});

	// Load example page and pass in an example by id
	app.get('/example/:id', function (req, res) {
		// db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
		// 	res.render('example', {
		// 		example: dbExample
		// 	});
		// });
		res.send('hello');
	});

	app.get('/hello', function (req, res) {
		var context = { title: 'My New Post', body: 'This is my first post!' };
		res.render('index', context);
	});

	// Render 404 page for any unmatched routes
	// app.get('*', function (req, res) {
	// 	res.render('404');
	// });

	app.get('/create', function (req, res){
		res.render('create');
	});
};
