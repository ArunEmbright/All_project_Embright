var express = require('express');
var router = express.Router();
const { User } = require('../model/user.model')
const jwt = require('jsonwebtoken');
var companyStorage = require ('../storages/speaker.storage');
var Profile = require ('../model/speaker.storage.model');

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

  res.header(
      'Access-Control-Expose-Headers',
      'x-access-token, x-refresh-token'
  );

  next();
});
let authenticate = (req, res, next) => {
  let token = req.header('x-access-token');


  jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
      if (err) {
          res.status(401).send(err);
      } else {

          req.user_id = decoded._id;
          next();
      }
  });
}
router.get('/',authenticate, async (req, res) => {
    const profiles = await Profile.find();
    res.status(200).json({ profiles });
  });

router.post('/', companyStorage,authenticate, async (req, res) => {
    
   const imagePath = 'http://localhost:3000/speaker-pic/' + req.file.filename;
    const profile = new Profile({
        
      imagePath,
      
      
    });
    const createdProfile = await profile.save();
    res.status(201).json({
      profile: {
        ...createdProfile._doc,
      },
    });
  });

  router.delete('/',authenticate, async (req, res)=>{
    const profiles = await Profile.remove();
    res.status(200).json({profiles})
  })

  router.get('/:id', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
    const id = req.params.id
   
    Profile.findOne({ _id: req.params.id, _userId: req.user_id })
        .then(function (list) {
            res.send(list)
        });
});
module.exports = router