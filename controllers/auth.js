const User = require('../models/user')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
require('dotenv').config()

const signup = async (req, res ) =>{
    const userExists = await User.findOne({ email: req.body.email})
    if(userExists){
        return res.status(403).json({
            error: "Email is taken"
        })
    }

    const user = await new User(req.body)
    await user.save()
    res.status(200).json({
        message: "Signup Success! Please login"
    })
}

const signin = (req, res) => {
    // finding the user by the email
    const { email, password } = req.body
    User.findOne({ email }, (err, user) =>{
        //if err or no user
        if(err || !user){
            return res.status(401).json({
                error: "User with that email doesn't exist . Please signup"
            })
        }

        // if user is found make sure the email and password match
        //create authenticate method in model and user here
        if(!user.authenticate(password))
        {
            return res.status(401).json({
                error:"Email and password doesn't match"
            })
        }

        //generate a token with userid and secret
        console.log(process.env.JWT_SECRET)

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

        // persist the token as 't' in cookie with expiry date
        res.cookie("t", token, {expire : new Date() + 9999})

        //return response with user and token to frontend client 
        const { _id, name , email } = user
        return res.json({
            token,
            user: { _id, email, name }
        })
    })
}

const signout = (req, res) => {
    res.clearCookie("t")
    return res.json({
        message: "Signout success!"
    })
}

const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: "auth"
})

module.exports = {
    signup,
    signin,
    signout,
    requireSignin

}