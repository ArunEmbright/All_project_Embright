const {CollegeModel}  = require("../models/college");
const {LocationModel}  = require("../models/location");

var ObjectId = require('mongoose').Types.ObjectId;


exports.addCollege = async (req,res)=>{
    let newCollege = new CollegeModel({
        location: req.body.location,
        college: req.body.college,
        amount:req.body.amount
        
 
    });
    newCollege.save().then((scoreDoc) => {
        res.send(scoreDoc);
      });
}


exports.addLocation = async (req,res)=>{
    let newLocation = new LocationModel({
        location: req.body.location,
        
      
        
 
    });
    newLocation.save().then((scoreDoc) => {
        res.send(scoreDoc);
        if(ScoreDoc ){
            res.send(200)
        }else{
            res.send(400)
        }
      });
}


exports.getList = async (req,res)=>{
    CollegeModel.find({},(err,score)=>{
        if(err){
            res.send("something wrong");

        }
        res.json(score)
    })
}

exports.getSingleCollege = async (req,res)=>{
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record id:${req.params.id}`)

    CollegeModel.findById(req.params.id, (err, doc) => {

        if (!err)
          res.send(doc)
        else
          console.log('Eror in retrieving data' + JSON.stringify(err, undefined, 2))
      })
}