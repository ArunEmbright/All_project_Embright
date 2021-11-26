const {User}  = require("../models/User");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require('dotenv/config');
const mailer = require('../_helpers/Nodemailer');


exports.registration = async (req,res)=>{
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            
            return res.status(400).send({msg: 'This email is already registered'})
            
        } else {
    let newUser = new User({
        firstName: req.body.name,
        lastName: req.body.lastName,
        location:req.body.location,
        email: req.body.email,
        phoneNumber: req.body.phone, 
        college: req.body.collegeName,
        registerNo: req.body.register_no,
        guardianFirstName: req.body.father_name,
        guardianLastName: req.body.father_last,
        guardianEmail: req.body.father_email,
        guardianPhoneNumber: req.body.father_phone,
        department: req.body.courseName,
        year: req.body.year,
        PaymentMode: req.body.paymentMode,
        _userId:req.user_id,
    });
    newUser.save().then((scoreDoc) => {
        res.send(scoreDoc);
      });
    }
})

}

exports.getUser = async (req,res)=>{
    User.find({},(err,score)=>{
        if(err){
            res.send("something wrong");

        }
        res.json(score)
    })
}


//**********Email confirmation*********/

exports.confirmation = async (req,res)=>{
    const {email} = req.body;
    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
        );
        oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN
        });
        const accessToken = oauth2Client.getAccessToken()
        const output = 
        `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
        <h4>Dear Student,</h4>
        <h2 style="text-align: center; text-transform: uppercase;color: teal;">Congratulations! you have successfully
            registered for the IIOP Program.</h2>

        <p>Depending on the mode of payment you have selected during the registration process our team will get in touch
            with you to help you complete the process </p>
        <p>we are excited to have you on board and we look forward to meeting you in the class soon till then have a
            safe and pleasant time.</p>
            <br>
            <p>Yours Truly,</p>
            <br>
            <p>Team Ethnotech</p>
    </div>
        `;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              type:"OAuth2",
              user:"nodejsa@gmail.com",
              clientId: process.env.CLIENT_ID,
              clientSecret: process.env.CLIENT_SECRET,
              refreshToken: process.env.REFRESH_TOKEN,
              accessToken:accessToken
            },
        });
              // create reusable transporter object using the default SMTP transport
    //   let transporter = nodemailer.createTransport({
    //     host: 'smtp.gmail.com', //'smtp.ethereal.email',
    //     port: 587, //587
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //       user: '', // ethnotech email
    //       pass: '', ethnotech password
    //     },
    //     tls: {
    //       rejectUnauthorized: false,
    //     },
    //   });
        const mailOptions = {
            from: 'Ethnotech <contactus@ethnotech.in>',
            to: email, // list of receivers
            subject: "Payment Verification: Ethnotech",
            generateTextFromHTML: true,
            html:output // html body
        };
        mailer(transporter,mailOptions)
        res.status(200).send({msg:'Email has been sent'})
}