
const router = require("express").Router();
const { Books } = require("../models/user");







router.get('/',async (req,res) => {

    let data = await Books
    let response = await data.find();
    res.send(response)

 })




router.delete('/user/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      await Books.findByIdAndDelete(userId);  // Delete user from MongoDB
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting user', error: err });
    }
  });



router.post("/", async(req,res) => {
    const NewBooks = new Books ({
        name:req.body.name,
        email:req.body.email,
        bookname:req.body.bookname,
        authorname:req.body.authorname,
    })
    try{
        const book = await NewBooks.save()
        console.log(book)
        console.log('success')
        res.json(book)
    }catch{
        console.log("not success")
    }
})

router.put('/bookupdate/:id', async (req, res) => {
    try {
        const { name, email } = req.body; // Destructure fields from request body

        // Find the user by ID and update
        const updatedUser = await Books.findByIdAndUpdate(
            req.params.id, // User ID from request parameters
            {
                name, // Update name
                email,
                bookname,
                authorname // Update email
                // Add other fields as needed
            },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser); // Send back the updated user object
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;


