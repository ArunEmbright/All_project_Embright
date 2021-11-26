var express = require("express");
var router = express.Router();
const { User } = require("../models/User");
var multer = require('multer');
const { SessionBooking } = require("../models/sessionBooking");
const { google } = require("googleapis");
var ObjectId = require('mongoose').Types.ObjectId;
const auth = require("../middleware/auth");
const { Activity } = require("../models/activity");
const  aws = require("aws-sdk")
const multerS3 = require("multer-s3")
const { Score } = require("../models/Score");
const { Appointment } = require('../models/appointment');
const { Therapist } = require("../models/therapist");
require("dotenv/config");

aws.config.update({
	accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,    
   
});
const s3 = new aws.S3();

const storageS3 = multerS3({
    s3,
    bucket: "auticare-teletherapy"+'/activity',
    acl: "public-read", // after uploading file, the file is readable publicly
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      cb(null, file.originalname);
    },
  });

  const uploadS3 = multer({ storage: storageS3 });

router.get("/sessionBooking", (req, res) => {
  SessionBooking.find({}, (err, users) => {
    if (err) {
      res.send("somethings wrong");
    }
    res.json(users);
  });
}).delete('/sessionBooking/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record: ${req.params.id}`)
  SessionBooking.findByIdAndRemove((req.params.id)).then((removedListDoc) => {
    res.send(removedListDoc);
  })
});

//***********user **************/
router.get('/therapist/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record id:${req.params.id}`)
  Therapist.findById(req.params.id, (err, doc) => {

    if (!err)
      res.send(doc)
    else
      console.log('Eror in retrieving data' + JSON.stringify(err, undefined, 2))
  })
})

router.get('/users/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record id:${req.params.id}`)
  User.findById(req.params.id, (err, doc) => {

    if (!err)
      res.send(doc)
    else
      console.log('Eror in retrieving data' + JSON.stringify(err, undefined, 2))
  })
})

router.get('/activity/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record id:${req.params.id}`)
  Activity.findById(req.params.id, (err, doc) => {

    if (!err)
      res.send(doc)
    else
      console.log('Eror in retrieving data' + JSON.stringify(err, undefined, 2))
  })
})
.patch('/activity/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record: ${req.params.id}`)
    Activity.findByIdAndUpdate((req.params.id), {
    $set: req.body
  }).then((updateList) => {
    
    res.send(updateList);
  })
}).delete('/activity/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record: ${req.params.id}`)
    Activity.findByIdAndRemove((req.params.id)).then((removedListDoc) => {
      res.send({ 'message': 'deleted successfully' });
  })
});


router.get("/users", (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send("somethings wrong");
    }
    res.json(users);
  });



}).patch('/users/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record: ${req.params.id}`)
  User.findByIdAndUpdate((req.params.id), {
    $set: req.body
  }).then(() => {
    res.send({ 'message': 'Updated successfully' });
  })
}).delete('/users/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record: ${req.params.id}`)
  User.findByIdAndRemove((req.params.id)).then((removedListDoc) => {
    res.send(removedListDoc);
  })
});


//***********result **************/

router.get("/result", (req, res) => {
  Score.find({}, (err, score) => {
    if (err) {
      res.send("somethings wrong");
    }
    res.json(score);
  });
});

router.get("/getActivity", (req, res) => {
  Activity.find({}, (err, score) => {
    if (err) {
      res.send("somethings wrong");
    }
    res.json(score);
  });
})



//***********free appointment **************/
router.get("/appointment", (req, res) => {
  Appointment.find({}, (err, score) => {
    if (err) {
      res.send("somethings wrong");
    }
    res.json(score);
  });
});

router.post('/addActivity',uploadS3.fields([{name: 'video', maxCount: 1}]), (req, res) => {
  const newActivity = new Activity({
    // therapistId: req.body.therapistId,
    activityId: req.body.activityId,
    activityName: req.body.activityName,
    typeOfAutism: req.body.typeOfAutism,
    skillArea: req.body.skillArea,
    activityPath: req.body.activityPath,

    activityPath: process.env.S3_BUCKET + '/activity/' + req.files.video[0].originalname,


  });
  newActivity.save().then((actDOc) => {
    res.send(actDOc);
  });
})

router.post("/addUser", (req, res) => {


  let newUser = new User({
    userId: req.body.userId,
    firstName: req.body.FirstName,
    patientName: req.body.patientName,
    lastName: req.body.LastName,
    dob: req.body.dob,
    email: req.body.email,
    mobileNumber: req.body.mobileNumber,
    relationType: req.body.relationType,


    _userId: req.user_id,
  });
  newUser.save().then((scoreDoc) => {
    res.send(scoreDoc);
  });
});
router.post('/paymentBooking', (req, res) => {
  let newUser = new User({
    userId: req.body.userId,
    firstName: req.body.FirstName,
    patientName: req.body.patientName,
    lastName: req.body.LastName,
    dob: req.body.dob,
    email: req.body.email,
    mobileNumber: req.body.mobileNumber,
    relationType: req.body.relationType,


    _userId: req.user_id,
  });
})


module.exports = router;