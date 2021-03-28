const Post = require('../models/post')

const getPosts = (req, res) => {
    const posts = Post.find()
    .select("_id title body")
    .then((posts)=> {
        res.json({ posts })
    })
    .catch(err => console.log(err))
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