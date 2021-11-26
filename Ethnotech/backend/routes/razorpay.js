var express = require('express');
var router = express.Router();
var Payment = require('../models/payment');

require('dotenv/config');


router.post('/payment', (req,res)=>{
    let newPayment = new Payment({
        firstName: req.body.firstName,
        email: req.body.email, 
        payment_id: req.body.payment_id,
        amount:req.body.amount

    });
    newPayment.save().then((scoreDoc) => {
        res.send(scoreDoc);
      });
 
})
router.get("/users", (req, res) => {
    Payment.find({}, (err, users) => {
      if (err) {
        res.send("somethings wrong");
      }
      res.json(users);
    });
  
  
  
  })


module.exports = router;
