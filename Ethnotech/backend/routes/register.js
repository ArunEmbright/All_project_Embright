
var express = require("express");
var router = express.Router();

const userController = require('../controller/user')

router.post("/register", userController.registration );

router.get("/userList", userController.getUser );

router.post("/confirmation", userController.confirmation );

module.exports = router;