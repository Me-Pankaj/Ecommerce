const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const User = require("../models/userModel");
const bcrypt=require("bcryptjs");
const sendToken = require("../utils/jwtToken.js");

// Register a USer

exports.registerUser=catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password}=req.body;
    const user=await User.create({
        name,
        email,password,
        avatar:{
            public_id: "this is sample id",
            url:"profileurl"
        }
    });

    sendToken(user,201,res);
});

// Login User

exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email and Password",400));
    }

    const user=await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }
    const isPasswordMatched= await user.comparePassword(password); // Userdefined MEthod
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }

    sendToken(user,200,res);
})
