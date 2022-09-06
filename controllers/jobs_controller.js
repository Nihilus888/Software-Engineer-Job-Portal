const postJobModel = require('../models/posting_jobs')
const savedJobModel = require('../models/saved_jobs')

module.exports = {
    listJobs: async (req,res) => {
        // perform API call to respective API from external party
        // list all jobs in JSON format
    },

    postJob: async (req,res) => {
        // perform validations
        // save new job data into database
    },

    showPostedJob: async (req,res) => {
        // show single posted job data
    },

    editJob: async (req,res) => {
        // perform validations
        // find and update job data into database
    },

    deleteJob: async (req,res) => {
        // find and delete job from database
    },

    listSavedJobs: async (req,res) => {
        // list all jobs in JSON format
    },

    showSavedJob: async (req,res) => {
        // show single saved job data
    },

    saveJob: async (req,res) => {
        // save job data listed via listJobs() into database
    },

    removeSavedJob: async (req,res) => {
        // find and remove saved job data from database collection
    }
}