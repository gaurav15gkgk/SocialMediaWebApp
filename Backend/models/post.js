const mongooose = require('mongoose')
const { ObjectId } = mongooose.Schema

const postSchema = new mongooose.Schema({
    title:{
        type: String,
        required: "Title is required",
        minlength: 4,
        maxlength: 150
    },

    body: {
        type: String,
        required: "Body is required",
        minlength: 4,
        maxlength: 2000
    },

    photo: {
        data: Buffer,
        contentType: String
    },

    postedBy: {
        type: ObjectId,
        ref: "User"
    },

    created: {
        type: Date,
        default: Date.now
    }


})

module.exports = mongooose.model("Post", postSchema)