//require dotenv file to encode password
require('dotenv').config()
const mongoose = require("mongoose");
const savedJobs = require("./models/saved_jobs");

const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@generalassembly.odxzs.mongodb.net`;

mongoose
  .connect(connStr, { dbName: "Job-Posting" })
  .then(() => {
    console.log("Mongo connection is working");
  })
  .catch((err) => {
    console.log(err);
  });

const seedSavedJobs = [
    {
        user: '6312f15b827f682a9bdd13ab',
        title: 'Software Engineer',
        salary_min: 5000,
        salary_max: 10000,
        currency: 'Singapore',
        tech_stacks: ['HTML', 'CSS', 'Javascript', 'Python'],
        position: 'Junior',
        company: 'Facebook'
    },

    {
        user: '6312f15b827f682a9bdd13ab',
        title: 'Software Engineer',
        salary_min: 5000,
        salary_max: 10000,
        currency: 'Singapore',
        tech_stacks: ['HTML', 'CSS', 'Javascript', 'Python', 'React', 'Vue'],
        position: 'Senior',
        company: 'Google'
    },

];

const seedDB = async () => {
  await savedJobs.deleteMany({});
  await savedJobs.insertMany(seedSavedJobs);
};

seedDB().then(() => {
  mongoose.connection.close();
});
