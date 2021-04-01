exports.userSignupValidator = (req,res, next) => {
    //name is not null and between 4- 10 characters
    req.check('name', 'Name is required').notEmpty()

    //email is not null , valid and normalized

    req.check('email', 'Email must be between 3 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Invalid email , Email must contain @')
        .isLength({
            min: 4,
            max: 2000
        })

    // for the password
    req.check('password','Password is required').notEmpty()
    req.check('password')
        .isLength({ min: 6})
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number')

    
        //checking for the errors
        const errors = req.validationErrors()

        // if error show the fist one as they happen
        if(errors){
            const firstError = errors.map(error => error.msg)[0]
            return res.status(400).json({ error : firstError})
        }

        //proceding to the next middleware
        next()
}