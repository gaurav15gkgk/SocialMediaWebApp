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

module.exports = {
    userById,
    hasAuthourization,
    allUsers
}