const passport = require('passport');
const db = require('../models');
var bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(app) {

    app.get('/auth/login', (req, res) => {
        res.send('login')
    });

    app.get('auth/logout', function(req, res) {
        req.logout();

        req.flash('success_msg', 'You are logged out');

        res.redirect('/auth/login');
    });


    // GET /auth/google
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  The first step in Google authentication will involve
    //   redirecting the user to google.com.  After authorization, Google
    //   will redirect the user back to this application at /auth/google/redirect
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile']
        }));

    // GET /auth/google/redirect
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  If authentication fails, the user will be redirected back to the
    //   login page.  Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.
    app.get('/auth/google/redirect', passport.authenticate('google', { failureRedirect: '/auth/login' }), (req, res) => {
        res.send(req.user);
        res.redirect('/schedule');
    });

    // Register User
    app.post('/auth/register', function(req, res) {
        var name = req.body.name;
        var email = req.body.email;
        var phone = req.body.phone;
        var thumbnail = req.body.picture;
        var password = req.body.password;
        var password2 = req.body.password2;

        console.log(`Name: ${name} Email: ${email} Phone: ${phone} Thumbnail: ${thumbnail} Password: ${password}/${password2}`)
        // Validation
        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('phone', 'Phone number is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

        var errors = req.validationErrors();

        if (errors) {
            res.render('register', {
                errors: errors
            });
        }
        else {
            bcrypt.genSalt(10, function(err, salt) {

                bcrypt.hash(password, salt, function(err, hash) {
                    password = hash;

                    db.EmployeeTable.create({
                        name: name,
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

            // //checking for email and username are already taken
            // User.findOne({
            //     username: {
            //         "$regex": "^" + username + "\\b", "$options": "i"
            //     }
            // }, function (err, user) {
            //     User.findOne({
            //         email: {
            //             "$regex": "^" + email + "\\b", "$options": "i"
            //         }
            //     }, function (err, mail) {
            //         if (user || mail) {
            //             res.render('register', {
            //                 user: user,
            //                 mail: mail
            //             });
            //         }
            //         else {
            //             var newUser = new User({
            //                 name: name,
            //                 email: email,
            //                 username: username,
            //                 password: password
            //             });
            //             User.createUser(newUser, function (err, user) {
            //                 if (err) throw err;
            //                 console.log(user);
            //             });
            //             req.flash('success_msg', 'You are registered and can now login');
            //             res.redirect('/users/login');
            //         }
            //     });
            // });
        }
    });
    passport.use(new LocalStrategy(
        function(username, password, done) {
            console.log(username);
            console.log(password);
            db.EmployeeTable.findOne({ where: { email: username } }).then(function(user) {
                if (!user) { return done(null, false); }

                return done(null, user.get());
                
                // if (err) { return done(err); }
                // if (!user) {
                //     return done(null, false, { message: 'Incorrect User' });
                // };

                // bcrypt.compare(password, user.password, function(err, isMatch) {
                //     if (err) throw err;
                //     if (isMatch) {
                //         return done(null, user);
                //     } else {
                //         return done(null, false, { message: 'Invalid password' });
                //     }
                // });
        })}));

    

    // app.post('/auth/login', (req, res) => {
    //     db.EmployeeTable.findOne({ where: { email: req.body.email } }).then((dbEmployee)=> {
    //         res.json(dbEmployee);
    //     }
    //     )
    // })

    app.post('/auth/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true
    }),
        (req, res) => {
            console.log(req.body.email)
            console.log(req.body.password)
            res.redirect('/');
        });



};