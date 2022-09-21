const mongoose = require("mongoose");

const savedJobsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },

  jobId: {
    type: []
  }
});

module.exports = mongoose.model("savedJobs", savedJobsSchema);
