var express = require("express");
var router = express.Router();
const { User } = require("../models/User");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const jwt = require("jsonwebtoken");
const JWT_KEY = "jwtactive987";
const auth = require("../middleware/auth");
const { Otp } = require("../models/Otp");
const bcrypt = require("bcryptjs");
const mailer = require("../Nodemailer.js");
const { Score } = require("../models/Score");
const { Appointment } = require('../models/appointment');
const { SessionBooking } = require("../models/sessionBooking");
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




router.post("/register", (req, res) => {
  const { userId, firstName, lastName, patientName, relationType, mobileNumber, dob, age, email, password } = req.body;
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
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

      const token = jwt.sign(
        {
          userId,
          firstName,
          lastName,
          patientName,
          relationType,
          mobileNumber,
          dob,
          age,
          email,
          password,
        },
        JWT_KEY,
        {
          expiresIn: "30m",
        }
      );
      const CLIENT_URL = process.env.FRONT_URI;
      const output = `
          <h2>Please click on below link to activate your account</h2>
          <p>${CLIENT_URL}/auth/activate/${token}</p>
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
        to: email, // list of receivers
        subject: "Account Verification: Auticare", // Subject line
        generateTextFromHTML: true,
        html: output, // html body {this is body}
      };
      mailer(transporter, mailOptions);
      res.status(201).send({ msg: "Email Sent to you!" });
    }
  });
});
// router.post('/register', (req, res) => {

//     let body = req.body;
//     let newUser = new User(body);

//     newUser.save().then(() => {
//         return newUser.createSession();
//     }).then((refreshToken) => {

//         return newUser.generateAccessAuthToken().then((accessToken) => {
//          return { accessToken, refreshToken }
//         });
//     }).then((authTokens) => {
//       res
//             .header('x-refresh-token', authTokens.refreshToken)
//             .header('x-access-token', authTokens.accessToken)
//             .send(newUser);
//     }).catch((e) => {
//         res.status(400).send(e);
//     })
//   })

router.put("/activate/:token", (req, res) => {
  const token = req.params.token;

  if (token) {
    jwt.verify(token, JWT_KEY, async function (err, user) {
      if (err) {
        return res
          .status(500)
          .json({ message: " Activation Link has expired" });
      } else {
        const {
          userId,
          firstName,
          lastName,
          patientName,
          relationType,
          mobileNumber,
          dob,
          age,
          email,
          password,
        } = user;
        try {
          const user = new User({
            userId,
            firstName,
            lastName,
            patientName,
            relationType,
            mobileNumber,
            dob,
            age,
            email,
            password,
          });
          await user.save();
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
});

//*****************  email activation ***************** //

router.post("/sendOTP", async (req, res) => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID, // ClientID
    process.env.CLIENT_SECRET, // Client Secret
    process.env.REDIRECT_URI // Redirect URL
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
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
        from: '"Auticare" <nodejsa@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Account Verification: Auticare", // Subject line
        generateTextFromHTML: true,
        html:
          "Hello " +
          "from Auticare" +
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
});

//*****************  OTP for password forget ***************** //

//*****************  OTP Confirmation ***************** //

router.post("/confirmOTP", async (req, res) => {
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
        res.status(201).json({ msg: "OTP Verified Successfully" });
      });
    });
  });
});

//*****************  change password ***************** //

router.put("/updatePassword", async (req, res) => {

  const { email, password } = req.body;
  try {
    var encryptpassword = bcrypt.hashSync(password, 10);
    let user = await User.findOneAndUpdate(
      { email },
      { password: encryptpassword }
    );

    await user.save();
    res.json(user);
  } catch (error) {
    console.log(error.message);
  }
});
// router.post("/the",  (req, res) => {
//   let therapistId = req.body.therapistId;
//   let name = req.body.name;
//   let location = req.body.location;
 

//   let newTherapist = new Therapist({
//     therapistId,
//     name,
//     location,
    
//   });
//   newTherapist.save().then((scoreDoc) => {
//     res.send(scoreDoc);
//   });
// });

router.post('/checkReport',(req,res)=>{
  Score.findOne({ userId: req.body.userId }).then((user) => {
   
    if (user) {
      return res.status(400).send({ msg: "your report is ready" });
    } else{
      return res.status(200).send({ msg: "Assessment start..." });
    }
  })
})


router.post("/score", auth.authenticate, (req, res) => {
  let sum = req.body.sum;
  let patientName = req.body.patientName;
  let age = req.body.age;
  let userId = req.body.userId;
  let degreeOfAutism = req.body.degreeOfAutism;

  let newScore = new Score({
    sum,
    patientName,
    age,
    userId,
    degreeOfAutism,
    _userId: req.user_id,
  });
  newScore.save().then((scoreDoc) => {
    res.send(scoreDoc);
  });
});

router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  User.findByCredentials(email, password)
    .then((user) => {
      return user
        .createSession()
        .then((refreshToken) => {
          return user.generateAccessAuthToken().then((accessToken) => {
            return { accessToken, refreshToken };
          });
        })
        .then((authTokens) => {
          res
            .header("x-refresh-token", authTokens.refreshToken)
            .header("x-access-token", authTokens.accessToken)
            .send(user);
        });
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.get("/score", auth.authenticate, (req, res) => {
  Score.find({
    _userId: req.user_id,
  })
    .then((lists) => {
      res.send(lists);
    })
    .catch((e) => {
      res.send(e);
    });
});

// router.get("/users", (req, res) => {
//   User.find({}, (err, users) => {
//     if (err) {
//       res.send("somethings wrong");
//     }
//     res.json(users);
//   });
// });

// router.get("/result", (req, res) => {
//   Score.find({}, (err, score) => {
//     if (err) {
//       res.send("somethings wrong");
//     }
//     res.json(score);
//   });
// });



router.get("/appointment", (req, res) => {
  Appointment.find({}, (err, score) => {
    if (err) {
      res.send("somethings wrong");
    }
    res.json(score);
  });
});


router.get("/user", auth.authenticate, (req, res) => {
  // We want to return an array of all the lists that belong to the authenticated user
  User.find({
    _id: req.user_id,
  })
    .then((lists) => {
      res.send(lists);
    })
    .catch((e) => {
      res.send(e);
    });
});

// router.get('/users' , (req,res)=>{
//   User.find({},(err, users)=>{
//     if(err){
//       res.send('something went wrong');
//       next()
//     }
//     res.json(users);
//   })
// })


router.post("/freeAppointment",auth.authenticate, async (req, res) => {
  const {  userId ,patientName,firstName,lastName, relationType, mobileNumber, age, email,_userId } = req.body;
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID, // ClientID
    process.env.CLIENT_SECRET, // Client Secret
    process.env.REDIRECT_URI // Redirect URL
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });
  const accessToken = oauth2Client.getAccessToken();
  try {
    const user = await User.findOne().or([
      {
        email: req.body.email,
      },

    ]);
    
    let newAppointment = new Appointment({
      userId:userId,
      patientName: patientName,
      firstName:firstName,
      lastName:lastName,
      relationType: relationType,
      mobileNumber: mobileNumber,
      age: age,
      email: email,
      _userId: req.user_id,

    });
    newAppointment.save((err) => {
      if (err) {
        return res.json({ msg: err.message });
      }
    

  
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
      const mailOptions = {
        from: '"Auticare" <nodejsa@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Free Consultation: Auticare", // Subject line
        generateTextFromHTML: true,
        html: `Hi,
        Greetings!!!
        Your booking is confirmed. Our team will contact you soon.
        
        Have a nice day!!!`, // html body {this is body}
      };
      mailer(transporter, mailOptions);
      res.status(201).send({ msg: "Email Sent to you!" });
    })
  } catch (error) {
    console.log(error.message); 

  }
}); 
router.post("/sessionBooking", async (req, res) => {
  const { userId ,therapistId,therapistName ,patientName,firstName,lastName, relationType, mobileNumber, age, email,_userId } = req.body;
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID, // ClientID
    process.env.CLIENT_SECRET, // Client Secret
    process.env.REDIRECT_URI // Redirect URL
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });
  const accessToken = oauth2Client.getAccessToken();
  try {
    const user = await User.findOne().or([
      {
        email: req.body.email,
      },

    ]);
    
    let newSessionBooking = new SessionBooking({
      userId:userId,
      // therapistId:therapistId,
      therapistName:therapistName,
      patientName: patientName,
      firstName:firstName,
      lastName:lastName,
      relationType: relationType,
      mobileNumber: mobileNumber,
      age: age,
      email: email,
      _userId: therapistId,

    });
    newSessionBooking.save((err) => {
      if (err) {
        return res.json({ msg: err.message });
      }
    

  
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
      const mailOptions = {
        from: '"Auticare" <nodejsa@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Free Consultation: Auticare", // Subject line
        generateTextFromHTML: true,
        html: `Hi,
        Greetings!!!
        Your booking with ${therapistName} is confirmed. Our team will contact you soon.
        
        Have a nice day!!!`, // html body {this is body}
      };
      mailer(transporter, mailOptions);
      res.status(201).send({ msg: "Email Sent to you!" });
    })
  } catch (error) {
    console.log(error.message); 

  }
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

router.get("/me/access-token", auth.verifySession, (req, res) => {
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
