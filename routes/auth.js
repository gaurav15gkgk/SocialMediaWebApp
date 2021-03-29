const express = require("express")
const { signup, signin  } = require("../controllers/auth")
const { userSignupValidator } = require("../Validators/SignUpValidator")

const router = express.Router()

router.post("/signup",userSignupValidator, signup)
router.post("/signin", signin)


module.exports = router