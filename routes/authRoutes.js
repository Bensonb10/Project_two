const db = require('../models');
const LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
const passport = require('passport');

module.exports = function (app) {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});
	passport.deserializeUser(function (id, done) {
		db.EmployeeTable.findById(id).then(function (user) {
			if (user) {
				done(null, user.get());
			} else {
				done(user.errors, null);
			}

		});
	});

	// Local login
	// When user.get() logs in, passport will check the form for an name attr of email and password
	passport.use('local-signin', new LocalStrategy({usernameField: 'email'}, function (email, password, done) {
		db.EmployeeTable.findOne({
			where: {
				email: email
			}
		}).then((user) => {
			if (!user) {
				console.log('wrong user');
				return done(null, false, { message: 'Incorrect User' });
			}

                bcrypt.compare(password, user.password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user.get());
                    } else {
                        console.log('wrong pw')
                        return done(null, false, { message: 'Invalid password' });
                    }
                });
            })
        }));

    // GET: /auth/logout
    // Logout User and redirect to Login Page
    app.get('/auth/logout', function (req, res) {
        if (req.isAuthenticated()) {
            req.logout();
            req.flash('success_msg', 'You have logged out');
            res.redirect('/');
        }
    });

    // GET: /auth/google
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  The first step in Google authentication will involve
    //   redirecting the user to google.com.  After authorization, Google
    //   will redirect the user back to this application at /auth/google/redirect
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile']
        }));

    // GET: /auth/google/redirect
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  If authentication fails, the user will be redirected back to the
    //   login page.  Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.
    app.get('/auth/google/redirect', passport.authenticate('google', { failureRedirect: '/auth/login' }), (req, res) => {
        res.send(req.user);
        res.redirect('/schedule');
    });

    // POST: /auth/register
    // Register a new user
    app.post('/auth/register', function (req, res) {
        // Storing the form's data: name, email, phone, thumbnail, password, and password2
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var phone = req.body.phone;
        var thumbnail = req.body.picture;
        var password = req.body.password;
        var password2 = req.body.password2;

        console.log(`Name: ${firstName} ${lastName} Email: ${email} Phone: ${phone} Thumbnail: ${thumbnail} Password: ${password}/${password2}`)

        // Using express-validator to validate the name attr of the form: name, email, phone, password, password2
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('phone', 'Phone number is not valid').isMobilePhone("any");
        req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

        var errors = req.validationErrors();

        // If there's errors, render the register template with the errors
        if (errors) {
            res.render('register', {
                errors: errors
            });
        }
        else {
            // Checking if email is already taken
            db.EmployeeTable.findOne({
                where: {
                    email: email
                }
            }).then((user) => {
                if (user) {
                    req.flash('error', 'Email is already taken')
                    res.redirect('/auth/register')
                } else {
                    // Create a hash password using bcrypt
                    bcrypt.genSalt(10, function (err, salt) {

                        bcrypt.hash(password, salt, function (err, hash) {
                            password = hash;

                            // Create the user with the data and hash pw 
                            db.EmployeeTable.create({
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                phone: phone,
                                picture: thumbnail,
                                password: password
                            }).then((dbEmployee) => {
                                req.flash('success_msg', 'Employee has been created');
                                res.redirect('/auth/register');
                            })
                        });
                    });
                }
            });
        };
    });

    // POST: /
    app.post('/', passport.authenticate('local-signin', {
        successRedirect: '/main',
        failureRedirect: '/',
        failureFlash: true
    }
    ));

};