const router = require("express").Router();
const { AddBook1, } = require("../models/user");
const upload = require('../ multer-config');













router.post('/', upload, (req, res) => {
    const { AddBookname, AddAuthorname,bookdesc,bookprice,bookoldprice ,bookrating} = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';
  
    const newData = new AddBook1({ AddBookname, AddAuthorname,bookdesc,bookprice,bookoldprice ,bookrating, image });
  
    newData.save()
      .then(data => res.json(data))
      .catch(err => res.status(500).json({ error: err.message }));
  });




 router.get('/', (req, res) => {
    AddBook1.find()
      .then(data => res.json(data))
      .catch(err => res.status(500).json({ error: err.message }));
  });



module.exports = router;