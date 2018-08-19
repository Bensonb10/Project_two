var db = require('../models');

module.exports = function (app) {
	// Load index page
	app.get('/', function (req, res) {
		// db.Example.findAll({}).then(function(dbExamples) {
		// 	res.render('index', {
		// 		msg: 'Welcome!',
		// 		examples: dbExamples
		// 	});
		// });
		res.render('index');
	});

	app.get('/auth/register', (req, res) => {
		res.render('register')
	});
	app.get('/auth/login', (req, res) => {
		res.render('login')
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
};
