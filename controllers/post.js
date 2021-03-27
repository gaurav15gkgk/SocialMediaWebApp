const Post = require('../models/post')

const getPosts = (req, res) => {
    res.send("Hello world from NodeJS")
}

const createPost = (req, res) =>{
    const post = new Post(req.body)
    
    
    post.save((err, result) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.status(200).json({
            post: result
        })
    })

    
}

module.exports = {
    getPosts,
    createPost
}