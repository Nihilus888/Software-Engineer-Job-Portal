const mongoose = require("mongoose");

const postingJobsSchema = new mongoose.Schema({

  // user: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'User',
  // },

  id: {
    type: String,
    required: true,
  },

  company: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  position: {
    type: String,
    required: true,
  },

  experience: {
    type: Number,
    required: true,
  },

  salary_min: {
    type: Number,
    required: true,
  },

  salary_max: {
    type: Number,
    required: true,
  },

  currency: {
    type: String,
    required: true,
  },

  skills: {
    type: [],
  },
});

module.exports = mongoose.model("postingJobs", postingJobsSchema);
