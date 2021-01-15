var express = require('express');
const bodyParser = require('body-parser');
var ToDoUsers = require("../model/user.model")
var userRouter = express.Router();
const bcrypt = require('bcrypt');

userRouter.use(bodyParser.json());

/* GET users. */
userRouter.post('/login', function (req, res, next) {
  ToDoUsers.findOne({ name: req.body.name })
      .then((user) => {
          if (user != null && bcrypt.compareSync(req.body.password, user.password)) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(user);
          } else {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.json({ "status": "Email or Password is incorrect" });
          }
      }, (err) => next(err))
      .catch((err) => next(err));
});

userRouter.post('/register', function (req, res, next) {
  ToDoUsers.findOne({ name: req.body.name })
      .then((user) => {
        console.log(req.body.name)
          if (user != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ 'res': 'User already exist.' });
          } else {
            var user = ToDoUsers();
            user.name = req.body.name;
            user.password = bcrypt.hashSync(req.body.password, 10);
            user.save().then(u=>{
              console.log(u)
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(u);
            }, (err) => {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.json({ 'error': "Something went wrong! Please try again later." });
          });
        }
      }, (err) => next(err))
      .catch((err) => next(err));
});

module.exports = userRouter;
