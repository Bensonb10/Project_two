// Dependencies
require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
const keys = require('./config/keys');
const expressSession = require('express-session');
const passport = require('passport');
const passportSetup = require('./config/passport-setup')(passport);
const expressValidator = require('express-validator');
const flash = require('connect-flash');
var db = require('./models');

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(expressSession({
	secret: keys.session.cookieKey,
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(expressValidator({
	errorFormatter: function (param, msg, value) {
		var namespace = param.split('.')
			, root = namespace.shift()
			, formParam = root;

		while (namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param: formParam,
			msg: msg,
			value: value
		};
	}
}));

// Global Vars
app.use(function (req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

// Handlebars
var hbsHelpers = require('./public/js/helpers.js');
app.engine(
	'handlebars', exphbs({
		defaultLayout: 'main',
		helpers: hbsHelpers
	})
);
app.set('view engine', 'handlebars');


// Routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);
require('./routes/authRoutes')(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
	syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
	app.listen(PORT, function () {

	});
});

module.exports = app;
