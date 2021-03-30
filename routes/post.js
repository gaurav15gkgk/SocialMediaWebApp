const express = require('express')

const {getPosts, createPost, postsByUser} = require('../controllers/post')
const { createPostValidator } = require('../Validators/PostValidator')
const { requireSignin } = require('../controllers/auth')
const { userById } = require("../controllers/user")

const router = express.Router()


router.get('/', getPosts)
router.post('/post/new/:userId',requireSignin , createPost, createPostValidator)
router.get('/post/by/:userId',postsByUser )


// any route containing : userId, our app will first execute userById()

router.param("userId", userById)


module.exports = router
