const _ = require('lodash')

const User = require('../models/user')


const userById = async (req, res, next, id ) => {
   await  User.findById(id).exec((err, user) => {
       if( err || !user)
       {
           return res.status(400).json({
               error: "User not found"
           })
       }

       req.profile = user; // adds profile object in req with user info

       next();
   })
}

const hasAuthourization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id;
    if(!authorized){
        return res.status(403).json({
            error: "User is not authorized to perform this action"
        })
    }
}

const allUsers = async(req, res) => {
    User.find((err, users) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json({ users })

    }).select("name email updated created")
}

const getUser = (req, res ) => {
    req.profile.hashed_password = undefined,
    req.profile.salt = undefined
    return res.json(req.profile);
}

const updateUser = (req, res, next) => {
    let user = req.profile;
    user = _.extend(user, req.body)
    user.updated = Date.now()
    user.save(err => {
        if(err){
            return res.status(400).json({
                error: "You are not authorized to preform this action "
            })
        }
        user.hashed_password = undefined
        user.salt = undefined
        res.json({ user })
    })
}

module.exports = {
    userById,
    hasAuthourization,
    allUsers,
    getUser,
    updateUser
}