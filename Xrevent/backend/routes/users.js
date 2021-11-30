var express = require('express');
var router = express.Router();
const {User} = require('../model/user.model');
const { route } = require('./speaker');
const jwt = require('jsonwebtoken');

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

router.post('/register', (req, res) => {


  let body = req.body;
  let newUser = new User(body);

  newUser.save().then(() => {
      return newUser.createSession();
  }).then((refreshToken) => {
    
      return newUser.generateAccessAuthToken().then((accessToken) => {
       return { accessToken, refreshToken }
      });
  }).then((authTokens) => {
    res
          .header('x-refresh-token', authTokens.refreshToken)
          .header('x-access-token', authTokens.accessToken)
          .send(newUser);
  }).catch((e) => {
      res.status(400).send(e);
  })
})
// let authenticate = (req, res, next) => {
//     let token = req.header('x-access-token');

 
//     jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
//         if (err) {
//              res.status(401).send(err);
//         } else {
            
//             req.user_id = decoded._id;
//             next();
//         }
//     });
// }


router.post('/login', (req, res) => {
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
})

let verifySession = (req, res, next) => {
  let refreshToken = req.header('x-refresh-token');

  let _id = req.header('_id');

  User.findByIdAndToken(_id, refreshToken).then((user) => {
      if (!user) {
          return Promise.reject({
              'error': 'User not found. Make sure that the refresh token and user id are correct'
          });
      }


      req.user_id = user._id;
      req.userObject = user;
      req.refreshToken = refreshToken;

      let isSessionValid = false;

      user.sessions.forEach((session) => {
          if (session.token === refreshToken) {
              if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
                  isSessionValid = true;
              }
          }
      });
     

      if (isSessionValid) {
          next();
      } else {
          return Promise.reject({
              'error': 'Refresh token has expired or the session is invalid'
          })
      }

  }).catch((e) => {
      res.status(401).send(e);
  })
}

router.get('/user',authenticate,(req,res)=>{
    User.find({
        _id:req.user_id
    }).then((lists)=>{
        res.send(lists);
    }).catch((e)=>{
        res.send(e)
    });
}).patch('/user/:id', (req, res)=>{
    // img='http://localhost:3000/images/' + req.file.filename;
    User.findByIdAndUpdate({
       _id: req.params.id, _userId: req.user_id, 
       
   },{
     $set:req.body  
   }) .then(()=>{
       res.send({'message': 'Updated successfully'});
   })
   
})
router.get('/:id',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
    const id=req.params.id
    User.findOne({_id:req.params.id,_userId : req.user_id})
    
    .then(function(list){
        res.send(list)
        });
       
});



router.get('/me/access-token', verifySession, (req, res) => {
  req.userObject.generateAccessAuthToken().then((accessToken) => {
      res.header('x-access-token', accessToken).send({ accessToken });
  }).catch((e) => {
      res.status(400).send(e);
  });
})



module.exports = router;
