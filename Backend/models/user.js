const mongooose = require('mongoose')
const { v1: uuidv1} = require('uuid')
const crypto = require('crypto')

const userSchema = new mongooose.Schema ({
    name: {
        type: String,
        trim: true,
        required: true
    },
    
    email: {
        type: String,
        trim: true,
        required: true
    },

    hashed_password: {
        type:String,
        required: true
    },

    salt: String,

    created: {
        type: Date,
        default: Date.now 
    },

    updated: Date
})

//virtual field

userSchema
    .virtual("password")
    .set(function(password){
        //create temporary variable called _password
        this._passsword = password;
        //generate a timestamp
        this.salt = uuidv1();
        //encryptPassword()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function(){
        return this._passsword;
    })
 

//methods

userSchema.methods = {

    authenticate: function(inputPassword){
        return this.encryptPassword(inputPassword) === this.hashed_password;
    },
    encryptPassword : function (password){
        if(!password){
            return "";
        }
            
        try{
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex")
        }catch(err){
            return "";
        }
    }
}


module.exports = mongooose.model("User", userSchema)