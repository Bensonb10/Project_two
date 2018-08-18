var db = require('../models');

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
  });
  app.get('/auth/register', (req, res) => {
    res.render('register')
  });
  app.get('/auth/login', (req, res) => {
    res.render('login')
  });

  // const authCheck = (req, res, next) => {
  //   if (!req.db.user) {
  //     res.redirect('/auth/login')
  //   } else {
  //     next();
  //   }
  // }

  // app.get('/schedule', authCheck, (req, res) => {
  //   res.render('schedule');
  // })

  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};
