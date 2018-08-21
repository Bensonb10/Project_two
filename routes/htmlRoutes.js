var db = require('../models');

module.exports = function (app) {
	// Checks incoming request to see if user is logged in. If not it will redirect to login handlebars with a message
	function checkAuthentication(req,res,next){
		if(req.isAuthenticated()){
			//req.isAuthenticated() will return true if user is logged in
			next();
		} else{
			res.render("login", {error: "You have to be sign in."});
		}
	}

	// Load index page
	app.get('/', checkAuthentication, function (req, res) {
		db.ScheduleTable.findAll({}).then((data) => {
			var hbsObj = {
				shifts: data
			};
			res.render('index', hbsObj);
		});
	});

	app.get('/schedule', function(req, res){
		db.ScheduleTable.findAll({}).then((data)=>{
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

	// Render 404 page for any unmatched routes
	// app.get('*', function (req, res) {
	// 	res.render('404');
	// });

	app.get('/create', function (req, res){
		db.EmployeeTable.findAll({include: db.AvailTable}).then((dbresult) => {
			let hbsObj = {employees: dbresult}
			// console.log(dbresult)
			// console.log("--------------------------")
			console.log(hbsObj.employees[0].AvailTables[0].avail)
			res.render('create', hbsObj)
		})
	});
};
