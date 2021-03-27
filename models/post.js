const mongooose = require('mongoose')

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
    }
})

module.exports = mongooose.model("Post", postSchema)