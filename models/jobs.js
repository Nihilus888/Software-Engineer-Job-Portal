const { number } = require('joi')
const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    salary: {
        min: Number,
        max: Number
    },

    currency: {
        type: String,
        required: true,
    },

    tech_stacks: {
        type: [jobSchema],
    },

    position: {
        type: String,
        required: true
    },

    company: {
        id: Number,
        companyName: String,
        required: true
    }

})

module.exports = mongoose.model('User', userSchema)