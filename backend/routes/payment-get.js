const router = require("express").Router();

const  authMiddleware = require('../middelware/authmiddelware');
const adminMiddelware = require("../middelware/adminmiddelware");
const Payment = require("../models/payment");
const Order = require('../models/payment');
const Razorpay = require("razorpay");


const crypto = require("crypto");







router.get('/details',authMiddleware, adminMiddelware, async (_req, res) => {
    try {
      const response = await Payment.find(); // Fetch all documents directly from the Payment model
      res.status(200).json(response); // Send the response as JSON
    } catch (error) {
      console.error('Error fetching payment details:', error); // Log any errors
      res.status(500).json({ message: 'Internal Server Error!' }); // Send error response
    }
  });
  router.post("/orders", async (req, res) => {
	try {
		const instance = new Razorpay({
			key_id: process.env.KEY_ID,
			key_secret: process.env.KEY_SECRET,
		});

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
			res.status(200).json({ data: order });
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

  router.post("/verify", async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            
        } = req.body;
        
        // Validate book details
      
        // Generate the expected signature
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            // Save payment details to the database
            const payment = await Payment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                
            });

           
            return res.status(200).json({
                message: "Payment verified successfully and order saved",
                // orderId: order._id, // Send back the order ID
            });
        } else {
            return res.status(400).json({ message: "Invalid signature sent!" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error!",  error });
    }
});


  

 module.exports = router;