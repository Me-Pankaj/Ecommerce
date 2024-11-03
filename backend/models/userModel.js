const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name Cannot Exceed 30 character"],
        minLength: [4, "Name should have more than 4 character"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a Valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter you Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false  // On using Find method personally it will give all document except password field
    },
    avatar:
    {
        // we need public id and image url and we will get public id from image host clodinary and 
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    role:{
        type:String,
        default:"user"
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,

})

module.exports=mongoose.model("User",userSchema);