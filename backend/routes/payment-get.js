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
        console.log("Request Body:", req.body); // Log incoming request for debugging
        const { amount, bookDetails } = req.body;

        if (!amount || !bookDetails) {
            return res.status(400).json({ message: "Amount and book details are required" });
        }

        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
        });

        const options = {
            amount: amount * 100, // Convert to paise
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        instance.orders.create(options, (error, order) => {
            if (error) {
                console.error("Error creating Razorpay order:", error);
                return res.status(500).json({ message: "Something went wrong!" });
            }
            res.status(200).json({ data: order });
        });
    } catch (error) {
        console.error("Error in /orders API:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});



router.post("/verify", async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            bookDetails,
            totalPrice,
            userId,
        } = req.body;

        // Validate required fields
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookDetails || !totalPrice) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Payment verification failed" });
        }

        // Update the order in the database
        const updatedOrder = await Order.findOneAndUpdate(
            { razorpay_order_id },
            {
                razorpay_payment_id,
                razorpay_signature,
                payStatus: "paid",
                "bookDetails.orderStatus": "Order confirm",
            },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Payment verified successfully", order: updatedOrder });
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});




  

 module.exports = router;