const mongoose = require("mongoose");
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');


const jwtSecret = "51778657246321226641fsdklafjasdkljfsklfjd7148924065dskdfbsdjfbsdkjfb";
 

const InstitutionSchema = new mongoose.Schema({

  institutionId: {
    type: String
  },
  institutionName: {
    type: String
  },
  email: {
    type: String
  },
  contact: {
    type: String
  },
  GST: {
    type: String
  },
  registeredAddress: {
    type: String
  },
  dob: {
    type: String
  },
  password: {
    type: String,
    // required: true,
    minlength: 8
  },

  docPath: {
    type: String
  },
  OtherDocPath: {
    type: String
  },
  _institutionId:{
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


InstitutionSchema.methods.toJSON = function () {
  const institution = this;
  const institutionObject = institution.toObject();

  return _.omit(institutionObject, ['password', 'sessions']);
}


InstitutionSchema.methods.generateAccessAuthToken = function () {
  const institution = this;
  return new Promise((resolve, reject) => {
      jwt.sign({ _id: institution._id.toHexString() }, jwtSecret, { expiresIn: "30m" }, (err, token) => {
          if (!err) {
              resolve(token);
          } else {
              reject();
          }
      })
  })
}

InstitutionSchema.methods.generateRefreshAuthToken = function () {
  return new Promise((resolve, reject) => {
       crypto.randomBytes(64, (err, buf) => {
           if (!err) {
               let token = buf.toString('hex');

               return resolve(token);
           }
       })
   })
}

InstitutionSchema.methods.createSession = function () {
  let institution = this;

  return institution.generateRefreshAuthToken().then((refreshToken) => {
      return saveSessionToDatabase(institution, refreshToken);
  }).then((refreshToken) => {
      return refreshToken;
  }).catch((e) => {
      return Promise.reject('Failed to save session to database.\n' + e);
  })
}
InstitutionSchema.statics.getJWTSecret = () => {
  return jwtSecret;
}

InstitutionSchema.statics.findByIdAndToken = function (_id, token) {
   

  const Institution = this;

  return Institution.findOne({ _id, 'sessions.token': token
  });
}


InstitutionSchema.statics.findByCredentials = function (email, password) {
  let Institution = this;
  return Institution.findOne({ email }).then((institution) => {
      if (!institution) return Promise.reject();

      return new Promise((resolve, reject) => {
          bcrypt.compare(password, institution.password, (err, res) => {
              if (res) {
                  resolve(institution);
              }
              else {
                  reject();
              }
          })
      })
  })
}
InstitutionSchema.statics.hasRefreshTokenExpired = (expiresAt) => {
  let secondsSinceEpoch = Date.now() / 1000;
  if (expiresAt > secondsSinceEpoch) {
     
      return false;
  } else {
   
      return true;
  }
}
InstitutionSchema.pre('save', function (next) {
  let institution = this;
  let costFactor = 10;

  if (institution.isModified('password')) {
      bcrypt.genSalt(costFactor, (err, salt) => {
          bcrypt.hash(institution.password, salt, (err, hash) => {
            Institution.password = hash;
              next();
          })
      })
  } else {
      next();
  }
});

let saveSessionToDatabase = (institution, refreshToken) => {
    
  return new Promise((resolve, reject) => {
      let expiresAt = generateRefreshTokenExpiryTime();

      institution.sessions.push({ 'token': refreshToken, expiresAt });

      institution.save().then(() => {
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
 
const Institution = mongoose.model('Institution', InstitutionSchema);

module.exports = { Institution }