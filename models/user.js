const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    job: {
        type: String,
    },

    postings: {
        type: String,
    },

    experience: {
        type: Number,
        required: true
    },

    skills: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('User', userSchema)