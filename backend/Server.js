require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require('body-parser')
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const ContactUser = require('./routes/contact');
const Booksuggest = require('./routes/books');
const AddBook = require('./routes/Addbook')
const authMiddleware = require('./middelware/authmiddelware');






// database connection
connection();

// middlewares
app.use(express.json());
app.use(bodyparser.json())
app.use(cors());
app.use('/uploads', express.static('uploads'));


// routes

//add book 

app.use('/addbook',AddBook);

app.use('/addbook/getapi',AddBook);

//user detailes
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
// app.use('/user/profile',authRoutes)

app.use('/get',userRoutes);

// app.get('/user-profile', authMiddleware, (req, res) => {
//     res.json(req.user);
//   });

//contact form data
app.use('/submit',ContactUser);
app.use('/contact/get/user',ContactUser);
app.use('/contact/update/:id',ContactUser);
// app.use('/delete/:id',ContactUser);




//book suggestdata
app.use('/getbook',Booksuggest);
app.use('/books',Booksuggest);
app.use('books/delete/:id',Booksuggest);




const port = process.env.PORT || 8000;
app.listen(port, console.log(`Listening on port ${port}...`));