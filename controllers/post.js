const Post = require('../models/post')

const getPosts = (req, res) => {
    res.send("Hello world from NodeJS")
}

const createPost = (req, res) =>{
    const post = new Post(req.body)
    
    
    post.save(() => {
        
        
        res.status(200).json({
          
            post
        })
    })

    
}

module.exports = {
    getPosts,
    createPost
}