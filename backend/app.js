const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");

// config
process.env.SECRET_KEY = "secret";

// database config
require('./database/mogoose');

app.use(express.json());
app.use(cors());

// routes
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/user');
const employeeRoute = require('./routes/employee');
const officeRoute = require('./routes/office');

app.use('/auth', authRoute);
app.use('/users', usersRoute)
app.use('/employees', employeeRoute);
app.use('/offices', officeRoute);


// global error handling

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})


app.listen(3000, () => console.log("Server Connected on port 3000"));
