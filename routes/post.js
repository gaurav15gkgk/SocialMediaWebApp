const express = require('express')

const {
    getPosts, 
    createPost, 
    postsByUser,
    postById,
    isPoster,
    deletePost,
    updatePost
    } = require('../controllers/post')
const { createPostValidator } = require('../Validators/PostValidator')
const { requireSignin } = require('../controllers/auth')
const { userById } = require("../controllers/user")

const router = express.Router()

//to get all the posts
router.get('/posts', getPosts)

//to create new post user authentication required
router.post('/post/new/:userId',requireSignin , createPost, createPostValidator)

//to get the all the post by the user
router.get('/post/by/:userId',postsByUser )

//to get delete a post 
router.delete('/post/:postId', requireSignin, isPoster, deletePost)

//to update a post
router.put('/post/:postId', requireSignin , isPoster, updatePost)


// any route containing : userId, our app will first execute userById()

router.param("userId", userById)

// any route containing : postId, our app will first execute postById()
router.param("postId", postById)


module.exports = router
