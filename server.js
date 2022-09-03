//require dotenv file to encode password
require("dotenv").config();

//Initializing necessary dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const res = require("express/lib/response");

//Will probably insert router here later

const app = express();
const port = process.env.PORT || 8000;
const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@generalassembly.odxzs.mongodb.net`;

//express use
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors({
  origin: '*'
}))

//render home page
app.get("/", (req, res) => {
  res.send("Success!");
});

app.listen(port, async () => {
  try {
    await mongoose.connect(connStr, { dbName: "Job-Posting" });
  } catch (err) {
    console.log(err);
    console.log(`Failed to connect to DB`);
    process.exit(1);
  }
  console.log("Connected to DB");
  console.log(`Example app listening on port ${port}`);
});
