const postJobModel = require('../models/posting_jobs')
const savedJobModel = require('../models/saved_jobs')
const jobVal = require('./validators/jobs')
const editJobVal = require('./validators/edit_jobs')

module.exports = {
    listJobs: async (req,res) => {
        // perform API call to respective API from external party
        // list all jobs in JSON format
        const searchStr = req.body.search
        let pg = req.body.pg
<<<<<<< HEAD
        if(!pg) {
=======
        if (pg === '') {
>>>>>>> bc61680 (search function to NodeFlair API completed)
            pg = 1
        }
        const response = await fetch(`https://www.nodeflair.com/api/v2/jobs?query=${searchStr}&page=${pg}`)
        const data = await response.json()
        let result = []
        data.job_listings.forEach((job,idx) => {
            result[idx] = {
                company: job.company,
                title: job.title,
                position: job.position,
                experience: job.seniority[0] ? job.seniority[0] : 'Not Stated',
                salary_min: job.salary_min ? job.salary_min : '',
                salary_max: job.salary_max,
                currency: job.currency,
                skills: job.tech_stacks,
                link: 'https://www.nodeflair.com'+job.job_path
            }
        })
        res.json(result)
        return
    },

    postJob: async (req,res) => {
        // perform validations
        const validationResults = jobVal.createJobs.validate(req.body)
        console.log("validationResults:", validationResults)

        if (validationResults.error) {
            res.json(validationResults.error.details[0].message)
            return
        }

        // save new job data into database
        const validatedResults = validationResults.value
        console.log("validatedResults: ",validatedResults)

        try {
            await postJobModel.create({
                user: validatedResults.user,
                company: validatedResults.company,
                title: validatedResults.title,
                position: validatedResults.position,
                experience: validatedResults.experience,
                salary_min: validatedResults.salary_min,
                salary_max: validatedResults.salary_max,
                currency: validatedResults.currency,
                skills: validatedResults.skills,
            })
        } catch (err) {
            console.log(err)
            res.json(err)
            return
        }
        console.log('Job successfully posted')
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
        console.log('id:', id)
        const foundJob = await postJobModel.findById(id)
        console.log('foundJob:', foundJob)

        if (!foundJob) {
            res.json('No such job found')
        }

        const validationResults = editJobVal.editJobs.validate(req.body)
        console.log('validationResults:',validationResults)

        if (validationResults.error) {
            res.json(validationResults.error.details[0].message)
            return
        }

        // find and update job data into database
        const validatedResults = validationResults.value
        console.log('ValidationResults: ', validatedResults)
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