var express = require("express");
var router = express.Router();
const { Therapist } = require("../models/therapist");
var multer = require('multer');
var path = require('path');
const bcrypt = require("bcryptjs");
var ObjectId = require('mongoose').Types.ObjectId;
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const JWT_KEY = "jwtactive987";
const nodemailer = require("nodemailer");
const mailer = require("../Nodemailer.js");
const therapistAuth = require("../middleware/auth");
const { SessionBooking } = require("../models/sessionBooking");
const  aws = require("aws-sdk")
const multerS3 = require("multer-s3")
require("dotenv/config");


router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id"
  );

  res.header(
    "Access-Control-Expose-Headers",
    "x-access-token, x-refresh-token"
  );

  next();
});

const storage = multer.diskStorage({
  destination: function(req,file,cb){
    if (file.fieldname === "image") { // if uploading resume
      cb(null, 'public/therapist/');
    } else { // else uploading image
      cb(null, 'public/certificate/');
    }
     
  },
  filename: function(req,file,cb){
     if (file.fieldname === "image") { // if uploading resume
      cb(null, req.body.therapistName.replace(/\s/g, "")+"."+"png");
    } else { // else uploading image
      const mimeType = file.mimetype.split('/');
    const fileType = mimeType[1];
    const fileName = req.body.therapistName.replace(/\s/g, "")+ '.' + "pdf";
    console.log("fileType",fileType)
      cb(null,fileName)
    }
     
  }
});
const upload = multer({storage:storage});
aws.config.update({
	accessKeyId: 'AKIAZBTMEBG72D6TR7FV',
    secretAccessKey: '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',    
   
});
const s3 = new aws.S3();

const storageS3 = multerS3({
    s3,
    bucket: "auticare-teletherapy",
    acl: "public-read", // after uploading file, the file is readable publicly
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      cb(null, file.originalname);
    },
  });

  const uploadS3 = multer({ storage: storageS3 });

router.post('/therapist',  uploadS3.fields([{name: 'image', maxCount: 1}, {name: 'doc', maxCount: 1
}]),async (req,res) => {
  Therapist.findOne({email: req.body.email}).then((doctor)=>{
    if(doctor){
      return res.status(400).send({ msg: "This email is already registered" });
    } else {
      const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
      );
      oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN,
      });
      const accessToken = oauth2Client.getAccessToken();
      const CLIENT_URL = process.env.FRONT_URI;
      const output = `
          <h2>Please click on below link to activate your account</h2>
          <p>${CLIENT_URL}/auth/therapist_Verify</p>
          <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
          `;
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: "nodejsa@gmail.com",
              clientId: process.env.CLIENT_ID,
              clientSecret: process.env.CLIENT_SECRET,
              refreshToken: process.env.REFRESH_TOKEN,
              accessToken: accessToken,
            },
          });
    
          // send mail with defined transport object
          const mailOptions = {
            from: '"AutiCare" <nodejsa@gmail.com>', // sender address
            to: req.body.email, // list of receivers
            subject: "Account Verification: Auticare", // Subject line
            generateTextFromHTML: true,
            html: output, // html body {this is body}
          };
          mailer(transporter, mailOptions);
           
          res.status(201).send({ msg: "Email Sent to you!" });
      
const newTherapist = new Therapist({
      // therapistId: req.body.therapistId,
       email:req.body.email,
      therapistName: req.body.therapistName, 
       specialization: req.body.specialization, 
      experience: req.body.experience,
       qualification: req.body.qualification,
      location: req.body.location,
      certPath:process.env.S3_BUCKET +'/'+ req.files.doc[0].originalname,
       imagePath: process.env.S3_BUCKET +'/'+ req.files.image[0].originalname
       
  });
  console.log("body",req.files.image[0].originalname); 
  newTherapist.save().then((scoreDoc) => {
    res.send(scoreDoc);
  });
      
    }
  })



  
 })

 router.put("/updatePassword", async (req, res) => {

  const { email, password } = req.body;
  try {
    var encryptpassword = bcrypt.hashSync(password, 10);
    let therapist = await Therapist.findOneAndUpdate(
      { email },
      { password: encryptpassword }
    );

    await therapist.save();
    res.json(therapist);
  } catch (error) {
    console.log(error.message);
  }
});


router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  Therapist.findByCredentials(email, password)
    .then((therapist) => {
      return therapist
        .createSession()
        .then((refreshToken) => {
          return therapist.generateAccessAuthToken().then((accessToken) => {
            return { accessToken, refreshToken };
          });
        })
        .then((authTokens) => {
          res
            .header("x-refresh-token", authTokens.refreshToken)
            .header("x-access-token", authTokens.accessToken)
            .send(therapist);
        });
    })
    .catch((e) => {
      res.status(400).send(e);
      console.log("error",e)
    });
});

router.get("/user", therapistAuth.authenticate, (req, res) => {
  // We want to return an array of all the lists that belong to the authenticated user
  Therapist.find({
    _id: req.user_id,
  })
    .then((lists) => {
      res.send(lists);
    })
    .catch((e) => {
      res.send("error",e);
    });
});
router.get('/therapist/:id', (req, res)=>{
  if(!ObjectId.isValid(req.params.id))
  return res.status(400).send(`No record id:${req.params.id}`)
 User.findById(req.params.id, (err, doc)=>{
  
     if(!err)
     res.send(doc)
     else
     console.log('Eror in retrieving data'+ JSON.stringify(err, undefined, 2))
 })
})


router.get("/therapist", (req, res) => { 
  Therapist.find({}, (err, users) => {
    if (err) {
      res.send("somethings wrong");
    }
    res.json(users); 
  });


}).patch('/therapist/:id',   (req, res) => {
  if(!ObjectId.isValid(req.params.id))
  return res.status(400).send(`No record: ${req.params.id}`)
  Therapist.findByIdAndUpdate((req.params.id), {
      $set: req.body
  }).then(() => {
      res.send({ 'message': 'Updated successfully' });
  })
}).delete('/therapist/:id',  (req, res) => {
  if(!ObjectId.isValid(req.params.id))
  return res.status(400).send(`No record: ${req.params.id}`)
  Therapist.findByIdAndRemove((req.params.id)).then((removedListDoc) => {
      res.send(removedListDoc);
  })
}); 
router.get("/sessionBooking", (req, res) => {
  SessionBooking.find({}, (err, users) => {
    if (err) {
      res.send("somethings wrong");
    }
    res.json(users);
  });
})

router.get("/session", therapistAuth.authenticate, (req, res) => {
  // We want to return an array of all the lists that belong to the authenticated user
  SessionBooking.find({
    _userId: req.user_id,
  })
    .then((lists) => {
      res.send(lists);
    })
    .catch((e) => {
      res.send("error",e);
    });
});

router.get("/:id", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  const id = req.params.id;
  User.findOne({ _id: req.params.id, _userId: req.user_id }).then(function (
    list
  ) {
    res.send(list);
  });
});
// router.get('/username', verifySession, (req, res, next) => {
//     return res.status(200).json({ firstName: decodedToken.firstName, _id: decodedToken._id });
//   })

router.get("/me/access-token", therapistAuth.verifySession, (req, res) => {
  req.userObject
    .generateAccessAuthToken()
    .then((accessToken) => {
      res.header("x-access-token", accessToken).send({ accessToken });
    })
    .catch((e) => {
      res.status(400).send(e); 
    });
});

module.exports = router;