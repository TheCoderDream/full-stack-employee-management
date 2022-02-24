const jwt = require("jsonwebtoken");
const User = require("../database/models/user");


const userByToken = (req, res) => {
  const decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );

  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.send("Index does not exist");
      }
    })
    .catch(err => {
      res.send("error: ", err);
    });
};

const userById = (req, res) => {
  User.find({
    _id: req.params.userId
  })
    .then(user => res.send(user))
    .catch(err => {
      res.send({
        err
      });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then(user => res.send(user))
    .catch(error => console.log(error));
};

const addUser = (req, res) => {
  new User({
    fullName: req.body.fullName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  })
    .save()
    .then(user => res.send(user))
    .catch(error => console.log(error));
};

module.exports = {
  userById,
  userByToken,
  getUsers,
  addUser
}
