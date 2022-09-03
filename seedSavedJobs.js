//require dotenv file to encode password
require('dotenv').config()
const mongoose = require("mongoose");
const saved_jobs = require("./models/saved_jobs");

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
  
];

const seedDB = async () => {
  await saved_jobs.deleteMany({});
  await saved_Jobs.insertMany(seedSavedJobs);
};

seedDB().then(() => {
  mongoose.connection.close();
});
