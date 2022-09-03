const mongoose = require('mongoose')

const savedJobsSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: true
    },

    salary_min: {
        type: Number,
        required: true
    },

    salary_max: {
        type: Number,
        required: true
    },

    currency: {
        type: String,
        required: true,
    },

    tech_stacks: {
        type: [],
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

module.exports = mongoose.model('savedJobs', userSchema)