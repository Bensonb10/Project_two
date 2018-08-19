const passport = require('passport');
const db = require('../models');
var bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (app) {
    // GET: /auth/login
    // Login Page
    app.get('/auth/login', (req, res) => {
        res.render('login')
    });

    // GET: /auth/logout
    // Logout User and redirect to Login Page
    app.get('/auth/logout', function (req, res) {
        req.logout();
        req.flash('success_msg', 'You have logged out');
        res.redirect('/auth/login');
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

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        db.EmployeeTable.findById(id).then(function (user) {
            done(null, user);
        });
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
        req.checkBody('firstName', 'First name is required').notEmpty();
        req.checkBody('lastName', 'Last name is required').notEmpty();
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('phone', 'Phone number is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();
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
                    return done(null, false, { message: 'Email address is already taken' })
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
                                req.flash('success_msg', 'You are registered and can now login');
                                res.redirect('/auth/login');
                            })
                        });
                    });
                }
            });

            // Local login
            // When user logs in, passport will check the form for an name attr of email and password
            passport.use(new LocalStrategy({
                usernameField: 'email'
            },
                function (req, email, password, done) {
                    db.EmployeeTable.findOne({
                        where: {
                            email: email
                        }
                    }).then((user) => {
                        if (!user) { return done(null, false, { message: 'Something went wrong with your login' }); }
                        return done(null, user.get());
                    })
                }));



            // POST: /auth/login
            //  
            app.post('/auth/login', passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/auth/login',
                failureFlash: true
            }), (req, res) => {
                res.redirect('/');
            });
        };
    });
};