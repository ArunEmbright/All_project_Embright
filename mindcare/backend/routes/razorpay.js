var express = require('express');
var router = express.Router();
var Payment = require('../models/payment');
var {nanoid} = require('nanoid')
require('dotenv/config');

var Razorpay = require('razorpay');

let instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAJORPAY_KEY_SECRET,
})

router.post('/payment', (req,res,next)=>{
     options ={
        
        amount:req.body.amount*100,
        currency:"INR",
        receipt:nanoid(),
        payment_capture:req.body.payment_capture
    };

   
    instance.orders.create(options)
	.then(async (response) => {
		// Save orderId and other payment details
		const paymentDetail = new Payment({
			orderId: response.id,
			receipt: response.amount,
			amount: response.amount,
            payment_capture:response.payment_capture
			// currency: response.currency,
			// createdAt: response.created_at,
			// status: response.status
		})
		try {
			// Render Order Confirmation page if saved succesfully
			await paymentDetail.save()
			res.json( {
				title: "Confirm Order",
				paymentDetail : paymentDetail
			})
		} catch (err) {
			// Throw err if failed to save
			if (err) throw err;
		}
	}).catch((err) => {
		// Throw err if failed to create order
		if (err) throw err;
	})
    
    
})


module.exports=router