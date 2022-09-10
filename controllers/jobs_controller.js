const postJobModel = require('../models/posting_jobs')
const savedJobModel = require('../models/saved_jobs')
const jobVal = require('./validators/jobs')

module.exports = {
    listJobs: async (req,res) => {
        // perform API call to respective API from external party
        // list all jobs in JSON format
        const searchStr = req.body.search
        const pg = req.body.pg
        const response = await fetch(`https://www.nodeflair.com/api/v2/jobs?query=${searchStr}&page=${pg}`)
        const data = await response.json()
        res.json(data)
        return
    },

    postJob: async (req,res) => {
        // perform validations
        const validationResults = jobVal.jobValidators.validate(req.body)

        if (validationResults.error) {
            res.json(validationResults.error.details[0].message)
            return
        }

        // save new job data into database
        const validatedResults = validationResults.value

        try {
            await postJobModel.create({
                user: validatedResults.user,
                title: validatedResults.title,
                salary_min: validatedResults.salary_min,
                salary_max: validatedResults.salary_max,
                currency: validatedResults.currency,
                tech_stacks: validatedResults.tech_stacks,
                position: validatedResults.position,
                company: validatedResults.company,
                experience: validatedResults.experience
            })
        } catch (err) {
            res.json(err)
            return
        }

        res.json('Job successfully posted!')
    },

    listPostedJobs: async (req,res) => {
        // list all posted jobs from DB
        const allPostedJobs = await postJobModel.find()
        res.json(allPostedJobs)
    },

    showPostedJob: async (req,res) => {
        // show single posted job data
        const id = req.params.id
        const postedJob = await postJobModel.findById(id)
        res.json(postedJob)
    },

    editJob: async (req,res) => {
        // perform validations
        const id = req.params.id
        const foundJob = await postJobModel.findById(id)

        if (!foundJob) {
            res.json('No such job found')
        }

        const validationResults = jobVal.jobValidators.validate(req.body)

        if (validationResults.error) {
            res.json(validationResults.error.details[0].message)
            return
        }

        // find and update job data into database
        const validatedResults = validationResults.value
        await postJobModel.findByIdAndUpdate(id, validatedResults)
        res.json(await postJobModel.findById(id))
    },

    deleteJob: async (req,res) => {
        // find and delete job from database
        const id = req.params.id
        await postJobModel.findByIdAndDelete(id)
    },

    listSavedJobs: async (req,res) => {
        // list all jobs in JSON format
        const allSavedJobs = await savedJobModel.find()
        res.json(allSavedJobs)
    },

    showSavedJob: async (req,res) => {
        // show single saved job data
        const id = req.params.id
        const savedJob = await savedJobModel.findById(id)
        res.json(savedJob)
    },

    saveJob: async (req,res) => {
        // save job data listed via listJobs() into database
    },

    removeSavedJob: async (req,res) => {
        // find and remove saved job data from database collection
        const id = req.params.id
        await savedJobModel.findByIdAndDelete(id)
    }
}