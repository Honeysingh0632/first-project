const router = require("express").Router();
const authMiddleware = require("../middelware/authmiddelware");
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");


const adminMiddelware = require("../middelware/adminmiddelware");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


router.get('/',authMiddleware,adminMiddelware,async (req,res) => {
	let data = await User
	let response = await data.find()
	res.send(response)
});



router.delete('/userdata/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      await User.findByIdAndDelete(userId);  // Delete user from MongoDB
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting user', error: err });
    }
  });

  // get single user data detailes

  router.get('/userlogin/:id',authMiddleware,adminMiddelware, async (req, res) => {
    try {
      const Id = req.params.id;
     const data = await User.findOne({_id:Id});  
     return res.status(200).json(data );
    } catch (err) {
      res.status(500).json({ message1: 'Error deleting user', error: err });
    }
  });

  //user contact update route

  router.put('/updateuserlogin/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;  // The data to update

    try {
        // Find document by ID and update it
        const updatedRecord = await User.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedRecord) {
            return res.status(404).json({ message1: "Record not found" });
        }

        res.json({
            message: "Record updated successfully",
            data: updatedRecord
        });
    } catch (error) {
        res.status(500).json({ message1: "Error updating data", error });
    }
});


// const bcrypt = require('bcrypt');

router.put('/forgotpassword/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = { ...req.body };

    try {
        // Check if password is being updated
        if (updatedData.password) {
            // Validate password strength (optional, implement your validation logic)
            if (updatedData.password.length < 6) {
                return res.status(400).json({ message: "Password must be at least 6 characters long" });
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            updatedData.password = await bcrypt.hash(updatedData.password, salt);
        }

        // Find user by ID and update
        const updatedRecord = await User.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

        if (!updatedRecord) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            message: "User updated successfully",
            data: updatedRecord
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            message: "An error occurred while updating the user",
            error: error.message // Optional: Include only in development for security
        });
    }
});

router.get("/singleuser",authMiddleware, async (req,res) => {
	try {
		const userdata = req.user;
		return res.status(200).json({message:userdata})
		
	} catch (error) {
		console.log(error);
		
		
	}
})




 



module.exports = router;
