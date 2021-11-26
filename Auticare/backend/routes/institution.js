var express = require("express");
var router = express.Router();
const { Institution } = require('../models/institution');
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
const institutionAuth = require("../middleware/auth");
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
aws.config.update({
	accessKeyId: 'AKIAZBTMEBG72D6TR7FV',
    secretAccessKey: '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',    
   
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "regDoc") { // if uploading resume
            cb(null, 'public/institutionDocument');
        } else { // else uploading image
            cb(null, 'public/otherDocument');
        }

    },
    filename: function (req, file, cb) {
        if (file.fieldname === "regDoc") { // if uploading resume
            cb(null, req.body.institutionName.replace(/\s/g, "") + "." + "pdf");
        } else { // else uploading image
            const mimeType = file.mimetype.split('/');
            const fileType = mimeType[1];
            const fileName = req.body.institutionName.replace(/\s/g, "") + '.' + "pdf";
            console.log("fileType", fileType)
            cb(null, fileName)
        }

    }
});
const upload = multer({ storage: storage });
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

 
 

router.post('/institution', uploadS3.fields([{ name: 'regDoc', maxCount: 1 }, {
    name: 'doc', maxCount: 10
}]), async (req, res) => {
    Institution.findOne({ email: req.body.email }).then((institution) => {
        if (institution) {
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
          <p>${CLIENT_URL}/auth/institution_Verify</p>
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
            console.log("body", req.files.doc[0].filename);
            const newInstitution = new Institution({
                // institutionId: req.body.institutionId,
                email: req.body.email,
                institutionName: req.body.institutionName,
                contact: req.body.contact,
                GST: req.body.GST,
                registeredAddress: req.body.registeredAddress,
                dob: req.body.dob,
                docPath: process.env.BACK_END + '/document/' + req.files.doc[0].filename,
                OtherDocPath: process.env.BACK_END + '/otherDocuments/' + req.files.regDoc[0].filename
            });

            newInstitution.save().then((scoreDoc) => {
                res.send(scoreDoc);
            });

        }
    })




})
router.get("/institution", (req, res) => { 
    Institution.find({}, (err, users) => {
      if (err) {
        res.send("somethings wrong");
      }
      res.json(users); 
    });
   
  
  })

module.exports=router