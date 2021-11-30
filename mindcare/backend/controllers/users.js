const {User}  = require("../models/User");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const jwt = require("jsonwebtoken");
const JWT_KEY = "jwtactive987";
const { Otp } = require("../models/Otp");
const bcrypt = require('bcryptjs');
require('dotenv/config');
const mailer = require('../_helpers/Nodemailer');
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

exports.login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
  
    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
           
            return user.generateAccessAuthToken().then((accessToken) => {
               return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
          res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
}

exports.registration = (req, res,next) => {

    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
          
          return res.status(400).send({msg: 'This email is already registered'})
          
      } else {
    
          const oauth2Client = new OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.REDIRECT_URI
            );
    
          oauth2Client.setCredentials({
              refresh_token: process.env.REFRESH_TOKEN
          });
          const accessToken = oauth2Client.getAccessToken()
          const { 
            firstName, 
            lastName, 
            email,
            avatar,
            dob,
            phoneNumber, 
            password 
          } = req.body; 
          const token = jwt.sign({ 
            firstName, lastName,email,avatar,  dob,
            phoneNumber,password
          }, JWT_KEY, { expiresIn: '30m' });
          const CLIENT_URL = process.env.FRONT_URI;
    
          const output = 
          `
          <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
          <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the MINDCAREXR.</h2>
          <h2 >Please click 
          <a href=${CLIENT_URL}/mindcare/auth/activate/${token} >HERE
          </a> to activate your account
          </h2>
          <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
          
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
          
          const mailOptions = {
              from: 'Mindcare <anureshkv1@gmail.com>',
              to: email, // list of receivers
              subject: "Account Verification: Mindcare",
              generateTextFromHTML: true,
              html:output // html body
          };
    
          mailer(transporter,mailOptions)
          res.status(200).send({msg:'Email has been sent'})
    
      }
    });
}

exports.tokenActivation = (req, res) => {
    const token = req.params.token;
  
    if (token) {
      jwt.verify(token, JWT_KEY, async function (err, user) {
        if (err) {
          return res
            .status(500)
            .json({ message: " Activation Link has expired" });
        } else {
          const { 
            firstName,
            lastName, 
            email, 
            avatar, 
            dob,
            phoneNumber,
            password
          } = user;
          try {
            const user = new User(
              { 
                firstName,
                lastName, 
                email, 
                avatar, 
                dob,
                phoneNumber,
                password
               });
          await user.save()
          //.then(() => {
          //     return user.createSession();
          // }).then((refreshToken) => {
          
          //     return user.generateAccessAuthToken().then((accessToken) => {
          //         return { accessToken, refreshToken }
          //     });
          // }).then((authTokens) => {
          //      res
          //         .header('x-refresh-token', authTokens.refreshToken)
          //         .header('x-access-token', authTokens.accessToken)
          //         .send(user);
          // }).catch((e) => {
          //     res.status(400).send(e);
          // });
            return res
              .status(200)
              .json({ message: "Registration Success. Please Signin..." });
          } catch (error) {
            return res.status(401).json({
              error: "Error Saving User in DB. Please Try Again...",
            });
          }
        }
      });
    }
}

exports.OTPsend =  async (req, res) => {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID, // ClientID
      process.env.CLIENT_SECRET, // Client Secret
      process.env.REDIRECT_URI// Redirect URL
      );
   
    oauth2Client.setCredentials({
      refresh_token:
      process.env.REFRESH_TOKEN
     });
    const accessToken = oauth2Client.getAccessToken();
  
    try {
      const user = await User.findOne().or([
        {
          email: req.body.email,
        },
        {
          name: req.body.userName,
        },
      ]);
  
      if (!user) {
        return res.json({ msg: "User Does not Exist" });
      }
      var digits = "0123456789";
      let otp = "";
      for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
      }
      let OTP = new Otp({
        userId: user._id,
        otp: otp,
      });
      OTP.save((err) => {
        if (err) {
          return res.json({ msg: err.message });
        }
      const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type:"OAuth2",
            user:"nodejsa@gmail.com",
            clientId:process.env.CLIENT_ID,
            clientSecret:process.env.CLIENT_SECRET,
            refreshToken:process.env.REFRESH_TOKEN,
            accessToken: accessToken,
          },
        });
  
         // send mail with defined transport object
    const mailOptions = {
      from: '"Mindcare" <nodejsa@gmail.com>', // sender address
      to: req.body.email, // list of receivers
      subject: "Account Verification: MindCare", // Subject line
      generateTextFromHTML: true,
      html: "Hello " +
      "from MINDCARE" +
      " Here is the OTP " +
      otp +
      " and it is valid for 5 mins from now!",
    };
    mailer(transporter, mailOptions);
    res.json({ msg: "Email Sent!" });
  });
  } catch (error) {
  console.log(error.message);
  }
}

exports.confirmOTP = async (req, res) => {
    Otp.findOne({ otp: req.body.otp }, (err, otp) => {
     
      if (!otp) {
        return res.status(400).json({ msg: "OTP Not Valid" });
      }
      User.findOne({ _id: otp.userId }, (err, user) => {
        if (err) {
          return res.json({ msg: err.message });
        }
        if (otp.isUsed) {
          return res.status(500).json({ msg: "OTP is Already Used" });
        }
        otp.isUsed = true;
        otp.save((err) => {
          if (err) {
            return res.json({ msg: err.message });
          }
          res.status(201).json({msg:"OTP Verified Successfully"});
        });
      });
    });
}

exports.PasswordUpdation =  async (req, res) => {
  
    const { email, password } = req.body;
    try {
      var encryptpassword=bcrypt.hashSync(password,10);
      let user = await User.findOneAndUpdate({ email }, { password: encryptpassword });
  
      
      await user.save();
      res.json(user);
    } catch (error) {
      console.log(error.message);
    }
}

exports.uploadAvatar = (req, res)=>{

    const file =  req.files.file;
    cloudinary.uploader.upload(file.tempFilePath, async(err,result)=> {
  try {
    await User.findOneAndUpdate({_id:req.user_id},{
      avatar:result.url
    })
    res.json({msg:"updated"})
  } catch (error) {
    
    return res.status(500).json({msg:error.message})
  }
      
      
  })
}

exports.getUsers = (req, res) => {
    // We want to return an array of all the lists that belong to the authenticated user 
    User.find({
        _id: req.user_id,
    }).then((lists) => {
        res.send(lists);
    }).catch((e) => {
        res.send(e);
    });
}

exports.getbyid = function (req, res) {
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
}

exports.accessauthtoken = (req, res) => {
    req.userObject
      .generateAccessAuthToken()
      .then((accessToken) => {
        res.header("x-access-token", accessToken).send({ accessToken });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
}