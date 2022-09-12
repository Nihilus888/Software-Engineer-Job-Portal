const express = require('express')
const jobsController = require('../controllers/jobs_controller')

const router = express.Router()

// list all jobs from search
router.post('/search', jobsController.listJobs)

// saved job route
router.post('/saved', jobsController.saveJob)

//list all saved jobs
router.get('/saved', jobsController.listSavedJobs)

// show single saved job data
router.get('/saved/:id', jobsController.showSavedJob)

// remove saved jobs route
router.delete('/saved/:id', jobsController.removeSavedJob)

// post new jobs route
router.post('/new', jobsController.postJob)

// list all posted jobs
router.get('/posted', jobsController.listPostedJobs)

// show single posted job data
router.get('/posted/:id', jobsController.showPostedJob)

// update job postings
router.patch('/posted/:id', jobsController.editJob)

// remove posted jobs route
router.delete('/posted/:id', jobsController.deleteJob)

module.exports = router