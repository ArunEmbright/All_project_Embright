
var express = require("express");
var router = express.Router();

const auth = require('../middleware/auth');
var userController = require('../controllers/users')





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



//*****************  Register User ***************** //


router.post("/register", userController.registration );


//*****************  email activation ***************** //

router.post("/activate/:token",userController.tokenActivation );


//*****************  OTP for password forget ***************** //

router.post("/sendOTP", userController.OTPsend);
 

//*****************  OTP Confirmation ***************** //

router.post("/confirmOTP", userController.confirmOTP);


//*****************  change password ***************** //

router.put("/updatePassword", userController.PasswordUpdation);


//*****************  Log user ***************** //


router.post('/login', userController.login)

router.patch('/upload_avatar', auth.authenticate, userController.uploadAvatar )



router.get('/user', auth.authenticate, userController.getUsers )


router.get("/:id", userController.getbyid);
// router.get('/username', verifySession, (req, res, next) => {
//     return res.status(200).json({ firstName: decodedToken.firstName, _id: decodedToken._id });
//   })

router.get("/me/access-token", auth.verifySession, userController.accessauthtoken);

module.exports = router;