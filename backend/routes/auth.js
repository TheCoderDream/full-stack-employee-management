const express = require('express')
const {register, login} = require("../controller/auth");
const router = express.Router();

//Register Index
router.post("/register", register);

//Login Index
router.post("/login", login);

module.exports = router;
