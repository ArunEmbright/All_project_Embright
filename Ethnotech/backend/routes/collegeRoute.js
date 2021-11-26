
var express = require("express");
var router = express.Router();

const userController = require('../controller/collegeRoute')

router.post("/addCollege", userController.addCollege );

router.post("/location", userController.addLocation );

router.get("/getList", userController.getList );

router.get("/getID/:id", userController.getSingleCollege );
module.exports = router;