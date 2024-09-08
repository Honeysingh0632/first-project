const router = require("express").Router();
const { User1, } = require("../models/user");



router.get('/',async (req,res) => {

    let data = await User1
    let response = await data.find();
    res.send(response)

 })

 router.post("/", async(req,res) => {

    const newUser = new User1 ({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        message:req.body.message,
    })
    try{
        const user = await newUser.save()
        console.log(user)
        console.log('success')
        res.json(user)
    }catch{
        console.log("not success")
    }
})


router.put('/', async (req, res) => {
    try {
        const User2 = await User1.findByIdAndUpdate(req.params.id,
             req.body,
             { new: true, runValidators: true });
        if (!User2) {
            return res.status(404).send();
        }
        res.status(200).send(User2);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/contact/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      await User1.findByIdAndDelete(userId);  // Delete user from MongoDB
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting user', error: err });
    }
  });





 module.exports = router;