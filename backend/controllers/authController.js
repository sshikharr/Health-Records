const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Generating a Json Web token
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET)
};

// Signup endpoint
exports.signup = async (req, res)=>{
    const { username, email, password } = req.body;
    try{
        // Checking if the user exists
    const userExists = await User.findOne({email});
    if(userExists){
        return res.status(400).json({
            message: "User already exists"
        })
    }

    // Creating the new user
    const user = await User.create({username, email, password});

    if(user){
        res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        });
    }else{
        res.status(400).json({
            message: "Invlaid User Data"
        })
    }
    }catch(e){
        res.json({
            message:"Error while signing up"
        })
    }
}

// Signin endpoint
exports.signin = async (req, res)=>{
    const { email, password } = req.body;
    try{
        // Find the user
    const user = await User.findOne({email: email});
    console.log("a")
    // Check the credentials
    if(user && (await user.comparePassword(password))){
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        })
    }else{
        res.status(401).json({
            message:"Invalid Credentials"
        })
    }
    }catch(e){
        res.json({
            message:"Error while signing in"
        })
    }
}

