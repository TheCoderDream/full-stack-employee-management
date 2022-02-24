const express = require('express');
const {userById, userByToken, getUsers, addUser} = require("../controller/user");
const router = express.Router();

router.get('/currentUser', userByToken);

router.get("/:userId", userById);

router.get("/", getUsers);

router.post("/add", addUser);

module.exports = router;
