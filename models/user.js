const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        minlength: 30
    },
    about: {
        type: String,
        required: true,
        minlength: 2,
        minlength: 30
    },
    avatar: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('user', userSchema)