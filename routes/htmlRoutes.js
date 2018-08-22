var db = require('../models');
var Sequelize = require('sequelize');

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

	// GET: /
	// Load index page
	app.get('/', checkAuthentication, function (req, res) {
		db.ScheduleTable.findAll({include: db.EmployeeTable}).then((data) => {
			var hbsObj = {
				shifts: data
			};
			res.render('index', hbsObj);
		});
	});

	// GET: /auth/register
	// Load Reigster page if user is autheticated
	app.get('/auth/register', checkAuthentication, (req, res) => {
		res.render('register');
	});

	// GET: /auth/login
	// Load Login
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

	// GET: /create
	// Load Create page if user is autheticated
	app.get('/create', (req, res) => {
		db.ScheduleTable.findAll({ include: db.EmployeeTable }).then((dbScheduleTable) => {
			console.log(dbScheduleTable[0])

			if (dbScheduleTable.length !== 0) {
				// Send hbsobj to make a sliders for each schedule/shift   

				// Send hbsobj to "Select Employee" dropdown btn that contains list<employees> available for that shift
				let monday = dbScheduleTable.filter((x) => x.date === '2018-08-20');
				let tuesday = dbScheduleTable.filter((x) => x.date === '2018-08-21');
				let hbsObj = {
					monday: monday,
					tuesday: tuesday
				};
				res.render('create', hbsObj);
			} else {
				res.render('create');
			}

		})

		// db.EmployeeTable.findAll({include: db.AvailTable}).then((dbResult) => {
		// 	console.log(dbResult[0].AvailTables);

			
		// 	// for(AvailTables)
		// 	// if(date === (shift date) && isAvail)
		// 	// if(start >= (shift start time) && end <= (shift end time))
		// 	// show employee

			

		// 	// console.log(hbsObj.employees[0].AvailTables[0].avail)

			
		// })

		// 	const Op = db.Sequelize.Op;
		// 	// Find all employees available for that shift
		// 	db.AvailTable.findAll({

		// 	// , {where: {
		// 	// 	date: {
		// 	// 		[Op.between]: [20180819, 20180820]
		// 	// 	}
		// 	// 	}
		// 	// }
		// }).then((dbAvailTable) => {
		// 		if (dbAvailTable.length !== 0) {
		// 			// Populate the "Select Employee"  
		// 			console.log(dbAvailTable)
		// 			let hbsObj = {shifts: dbAvailTable};

		// 		} else {
		// 			res.render('create');
		// 		}
		// 	});
	});

	app.post('/create', checkAuthentication, (req, res) => {
		let currentDate = "2018-08-22";
		let startShift = "0900";
		let endShift = "2100"
		db.ScheduleTable.create({
			date: currentDate,
			start: startShift,
			end: endShift
		}).then((dbScheduleTable) => {
			req.flash('success_msg', 'Created a new shift');
			res.redirect('/create');
		})
	})
};
