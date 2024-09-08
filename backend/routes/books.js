
const router = require("express").Router();
const { Books } = require("../models/user");
const bcrypt = require("bcrypt");






router.get('/',async (req,res) => {

    let data = await Books
    let response = await data.find();
    res.send(response)

 })


//  router.delete('/',async(req,res) => {
//     let data = await Books
//     let result = await data.deleteOne({_id:(req.params.id)})
//     res.send(result)
    
// })

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

router.delete('/', async (req, res) => {
    try {
        const item = await Books.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).send({ message: 'Item not found' });
        }
        res.send({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;


