const express = require("express");
const router = express.Router();
const calendarController = require('../controllers/calendar');
const auth = require('../middleware/auth')


router.post("/eventAdd",auth.authenticate, calendarController.calendarAddEvents, )

router.get("/getEventlist", auth.authenticate,calendarController.calendarGetEvents)

router.get("/eventEdit/:id",calendarController.calendarGetByIdEvents);

router.post("/meet", calendarController.meetLink)


module.exports=router