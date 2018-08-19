const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('./keys');
const db = require('../models');

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        console.log('In the callback');
        console.log(profile);

        db.EmployeeTable.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser) {
                console.log('Current User is ' + currentUser);
                done(null, currentUser);
            } else {
             console.log("Not a user")   
            }
        });
    })
);

