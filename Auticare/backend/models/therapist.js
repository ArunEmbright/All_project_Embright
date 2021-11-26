const mongoose = require("mongoose");
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');


const jwtSecret = "51778657246321226641fsdklafjasdkljfsklfjd7148924065dskdfbsdjfbsdkjfb";
 

const TherapistSchema = new mongoose.Schema({

  therapistId: {
    type: String
  },
  therapistName: {
    type: String
  },
  email: {
    type: String
  },
  specialization: {
    type: String
  },
  experience: {
    type: String
  },
  qualification: {
    type: String
  },
  location: {
    type: String
  },
  password: {
    type: String,
    // required: true,
    minlength: 8
  },

  certPath: {
    type: String
  },
  imagePath: {
    type: String
  },
  _therapistId:{
    type: mongoose.Types.ObjectId,
    require: true
},
sessions: [{
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Number,
        required: true
    }
}]

});


TherapistSchema.methods.toJSON = function () {
  const therapist = this;
  const therapistObject = therapist.toObject();

  return _.omit(therapistObject, ['password', 'sessions']);
}


TherapistSchema.methods.generateAccessAuthToken = function () {
  const therapist = this;
  return new Promise((resolve, reject) => {
      jwt.sign({ _id: therapist._id.toHexString() }, jwtSecret, { expiresIn: "30m" }, (err, token) => {
          if (!err) {
              resolve(token);
          } else {
              reject();
          }
      })
  })
}

TherapistSchema.methods.generateRefreshAuthToken = function () {
  return new Promise((resolve, reject) => {
       crypto.randomBytes(64, (err, buf) => {
           if (!err) {
               let token = buf.toString('hex');

               return resolve(token);
           }
       })
   })
}

TherapistSchema.methods.createSession = function () {
  let therapist = this;

  return therapist.generateRefreshAuthToken().then((refreshToken) => {
      return saveSessionToDatabase(therapist, refreshToken);
  }).then((refreshToken) => {
      return refreshToken;
  }).catch((e) => {
      return Promise.reject('Failed to save session to database.\n' + e);
  })
}
TherapistSchema.statics.getJWTSecret = () => {
  return jwtSecret;
}

TherapistSchema.statics.findByIdAndToken = function (_id, token) {
   

  const Therapist = this;

  return Therapist.findOne({ _id, 'sessions.token': token
  });
}


TherapistSchema.statics.findByCredentials = function (email, password) {
  let Therapist = this;
  return Therapist.findOne({ email }).then((therapist) => {
      if (!therapist) return Promise.reject();

      return new Promise((resolve, reject) => {
          bcrypt.compare(password, therapist.password, (err, res) => {
              if (res) {
                  resolve(therapist);
              }
              else {
                  reject();
              }
          })
      })
  })
}
TherapistSchema.statics.hasRefreshTokenExpired = (expiresAt) => {
  let secondsSinceEpoch = Date.now() / 1000;
  if (expiresAt > secondsSinceEpoch) {
     
      return false;
  } else {
   
      return true;
  }
}
TherapistSchema.pre('save', function (next) {
  let therapist = this;
  let costFactor = 10;

  if (therapist.isModified('password')) {
      bcrypt.genSalt(costFactor, (err, salt) => {
          bcrypt.hash(therapist.password, salt, (err, hash) => {
            Therapist.password = hash;
              next();
          })
      })
  } else {
      next();
  }
});

let saveSessionToDatabase = (therapist, refreshToken) => {
    
  return new Promise((resolve, reject) => {
      let expiresAt = generateRefreshTokenExpiryTime();

      therapist.sessions.push({ 'token': refreshToken, expiresAt });

      therapist.save().then(() => {
          return resolve(refreshToken);
      }).catch((e) => {
          reject(e);
      });
  })
}

let generateRefreshTokenExpiryTime = () => {
  let daysUntilExpire = "10";
  let secondsUntilExpire = ((daysUntilExpire * 24) * 60) * 60;
  return ((Date.now() / 1000) + secondsUntilExpire);
}
 
const Therapist = mongoose.model('Therapist', TherapistSchema);

module.exports = { Therapist }