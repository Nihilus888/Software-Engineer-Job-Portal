//require dotenv file to encode password
require('dotenv').config()
const mongoose = require("mongoose");
const User = require("../models/user");

const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@generalassembly.odxzs.mongodb.net`;

mongoose
  .connect(connStr, { dbName: "Job-Posting" })
  .then(() => {
    console.log("Mongo connection is working");
  })
  .catch((err) => {
    console.log(err);
  });

const seedUsers = [
  {
    name: "John Tan",
    email: "johntan@gmail.com",
    password: "12345",
    job: "Software Engineer",
    position: "Fullstack",
    experience: 5,
    skills: ["NodeJs", "React JS", "HTML", "CSS", "Javascript"],
  },

  {
    name: "James Tan",
    email: "jamestan@gmail.com",
    password: "123456",
    job: "Data Scientist",
    position: "Senior",
    experience: 3,
    skills: [
      "Jupyter Notebook",
      "sci-kit learn",
      "matplotlib",
      "python",
      "R",
      "SQL",
      "",
    ],
  },
];

const seedDB = async () => {
  await User.deleteMany({});
  await User.insertMany(seedUsers);
};

seedDB().then(() => {
  mongoose.connection.close();
});
