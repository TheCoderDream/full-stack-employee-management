const User = require("../database/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const today = new Date();
  const userData = {
    fullName: req.body.fullName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    date: today
  };

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then(user => {
              const payload = {
                _id: user._id,
                fullName: user.fullName,
                userName: user.userName,
                email: user.email
              };
              let token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: 1440
              });
              res.json({ token: token });
            })
            .catch(err => {
              res.send("error: " + err);
            });
        });
      } else {
        res.json({ error: "Index already exists" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
};

//Login Index
const login = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user.id,
            fullName: user.fullName,
            userName: user.userName,
            email: user.email
          };
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          });
          res.json({ token: token });
        } else {
          res.json({ error: "Password is incorrect " });
        }
      } else {
        res.json({ error: "Index does not exist " });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
};

module.exports = {
  login,
  register
}
