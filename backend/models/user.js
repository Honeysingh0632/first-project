const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const UserSchema1= new mongoose.Schema({
    
    name:String,
    email:String,
    phone:Number,
    message:String,


})

const BookSchema = new mongoose.Schema({

	

    name:String,
    email:String,
    bookname:String,
    authorname:String,

})

const AddBook = new mongoose.Schema({
	AddBookname:String,
	AddAuthorname:String,
	image:String,
	bookdesc:String,
	bookprice:String,
	bookoldprice:String,
	bookrating:Number,




})

//schema

const User1 = mongoose.model("user-details1",UserSchema1)

const Books =mongoose.model("book-sugguest",BookSchema)

const User = mongoose.model("test", userSchema);

const AddBook1 = mongoose.model("add-book",AddBook)


const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { User,User1,Books,AddBook1, validate };