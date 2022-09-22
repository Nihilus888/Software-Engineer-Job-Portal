const jwt_decode = require('jwt-decode');
const jwt = require("jsonwebtoken");
const postJobModel = require("../models/posting_jobs");
const savedJobModel = require("../models/saved_jobs");
const jobVal = require("./validators/jobs");
const editJobVal = require("./validators/edit_jobs");
const { default: jwtDecode } = require('jwt-decode');
const mongoose = require('mongoose')


module.exports = {
  listJobs: async (req,res) => {
    // perform API call to respective API from external party
    // list all jobs in JSON format
    const searchStr = req.body.search
    let pg = req.body.pg

    if(!pg) {
        pg = 1
    }
    const response = await fetch(`https://www.nodeflair.com/api/v2/jobs?query=${searchStr}&page=${pg}`)
    const data = await response.json()
    let result = []
    data.job_listings.forEach((job,idx) => {
        result[idx] = {
            company: job.company.companyname,
            title: job.title,
            position: job.position,
            experience: job.seniority[0] ? job.seniority[0] : '',
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

  postJob: async (req, res) => {
    // perform validations
    let token = res.locals.userAuth
    console.log('token: ', token)
    let Id = token.data.id
    console.log('Id:', Id)
    let userId = mongoose.Types.ObjectId(Id)
    console.log('userId: ', userId)
    

    const validationResults = jobVal.createJobs.validate(req.body);
    console.log("validationResults:", validationResults);

    if (validationResults.error) {
      res.json(validationResults.error.details[0].message);
      return;
    }

    // save new job data into database
    const validatedResults = validationResults.value;
    console.log("validatedResults: ", validatedResults);

    try {
      console.log('userId2:', userId)
      await postJobModel.create({
        user: userId,
        company: validatedResults.company,
        title: validatedResults.title,
        position: validatedResults.position,
        experience: validatedResults.experience,
        salary_min: validatedResults.salary_min,
        salary_max: validatedResults.salary_max,
        currency: validatedResults.currency,
        skills: validatedResults.skills,
      });
    } catch (err) {
      console.log(err);
      res.json(err);
      return;
    }
    console.log("Job successfully posted");
    res.json("Job successfully posted!");
  },

  listPostedJobs: async (req, res) => {
    // list all posted jobs from DB
    const allPostedJobs = await postJobModel.find();
    res.json(allPostedJobs);
  },

  listUserPostedJobs: async (req,res) => {
    // list all jobs that user has posted
    const token = res.locals.userAuth
    const id = mongoose.Types.ObjectId(token.data.id)
    try {
    const userPostedJobs = await postJobModel.find({user : id})
    res.json(userPostedJobs)
    } catch(err) {
      res.json("You have not posted any jobs")
    }
  },

  showPostedJob: async (req, res) => {
    // show single posted job data
    const id = req.params.id;
    const postedJob = await postJobModel.findById(id);
    res.json(postedJob);
  },

  editJob: async (req, res) => {
    const id = req.params.id;
    console.log("id:", id);
    const foundJob = await postJobModel.findById(id);
    console.log("foundJob:", foundJob);

    if (!foundJob) {
      res.json("No such job found");
    }

    const validationResults = editJobVal.editJobs.validate(req.body);
    console.log("validationResults:", validationResults);

    if (validationResults.error) {
      res.json(validationResults.error.details[0].message);
      return;
    }

    // find and update job data into database
    const validatedResults = validationResults.value;
    console.log("ValidationResults: ", validatedResults);
    await postJobModel.findByIdAndUpdate(id, validatedResults);
    res.json(await postJobModel.findById(id));
  },

  deleteJob: async (req, res) => {
    // find and delete job from database
    const id = req.params.id;
    await postJobModel.findByIdAndDelete(id);
    console.log('delete successful')
    res.json('delete successfull')
  },

  listSavedJobs: async (req, res) => {
    // list all jobs in JSON format
    const token = res.locals.userAuth
    let userId = mongoose.Types.ObjectId(token.data.id)
    const filter = { user: userId }

    const savedJobData = await savedJobModel.find(filter)
    res.json(savedJobData);
  },

  showSavedJob: async (req, res) => {
    // show single saved job data
  },

  saveJob: async (req, res) => {
    // save job data listed via listJobs() into database
    const saveId = req.body.id
    const token = res.locals.userAuth
    let userId = mongoose.Types.ObjectId(token.data.id)

    const filter = { user: userId }
    const update = { $push: { jobId : saveId } }

    //validation
    const validationAcc = await savedJobModel.find(filter)

    if (validationAcc === undefined) {
      await savedJobModel.create({
        user: userId,
        jobId: null
      })
    } else {
      try {
        if (validationAcc[0].jobId.includes(saveId)) {
          return res.json("Job exists in saved database")
        }
      } catch (err) {
        console.log("User saved data does not exist: ",err)
      }
    }

    //adding job ID to savedJobs DB
    await savedJobModel.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true
    })

    return res.json("Job Saved!")
  },

  removeSavedJob: async (req, res) => {
    // find and remove saved job data from database collection
    const id = req.params.id;
    await savedJobModel.findByIdAndDelete(id);
  },
};

