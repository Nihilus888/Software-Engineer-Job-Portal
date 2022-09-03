//require dotenv file to encode password
require('dotenv').config()
const mongoose = require("mongoose");
const postingJobs = require("./models/posting_jobs");

const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@generalassembly.odxzs.mongodb.net`;

mongoose
  .connect(connStr, { dbName: "Job-Posting" })
  .then(() => {
    console.log("Mongo connection is working");
  })
  .catch((err) => {
    console.log(err);
  });

const seedPostingJobs = [
    {
        user: '6312f15b827f682a9bdd13ab',
        title: 'Software Engineer',
        salary_min: 5000,
        salary_max: 10000,
        currency: 'Singapore',
        tech_stacks: ['HTML', 'CSS', 'Javascript', 'Python'],
        position: 'Junior',
        company: 'Abel',
        experience: 5
    },

    {
        user: '6312f15b827f682a9bdd13ab',
        title: 'Data Scientist',
        salary_min: 5000,
        salary_max: 10000,
        currency: 'Singapore',
        tech_stacks: ['scikit-learn', 'matplotlib', 'sns', 'Python', 'Tensorflow', 'Pytorch'],
        position: 'Senior',
        company: 'Nodeflair',
        experience: 1
    },

];

const seedDB = async () => {
  await postingJobs.deleteMany({});
  await postingJobs.insertMany(seedPostingJobs);
};

seedDB().then(() => {
  mongoose.connection.close();
});
