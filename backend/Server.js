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
// const resetpassword= require('./routes/Forgot')
const authMiddleware = require('./middelware/authmiddelware');
const passwordResetRoutes = require('./routes/Passwordreset');






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
app.use('',AddBook);

//user detailes
app.use("/user", userRoutes);
app.use('/get',userRoutes);
app.use('',userRoutes);

//auth route

app.use("/auth", authRoutes);
app.use("/userdata", userRoutes);



//contact form data
app.use('/submit',ContactUser);
app.use('/contact/get/user',ContactUser);
app.use('/contact/update/:id',ContactUser);
app.use('',ContactUser);




//book suggestdata
app.use('/getbook', Booksuggest);
app.use('/books',Booksuggest);
app.use('',Booksuggest)

//forgot password

app.use("/api/password-reset", passwordResetRoutes);


// app.use('/',resetpassword);

// app.get('/private', authMiddleware, (req, res) => {
//     res.json({ message: 'This is a private route', user: req.user });
//   });

const port = process.env.PORT || 8000;
app.listen(port, console.log(`Listening on port ${port}...`));
