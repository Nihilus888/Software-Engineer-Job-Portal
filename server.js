//require dotenv file to encode password
require("dotenv").config();

//Initializing necessary dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const res = require("express/lib/response");
const { Router } = require("express");
const user_controller = require("./controllers/user_controller");
const auth_middleware = require("./middleware/auth_middleware");

//Will probably insert router here later

const app = express();
const port = process.env.PORT || 8000;
const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@generalassembly.odxzs.mongodb.net`;

//set view engine
app.set('view engine', 'ejs')

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

//get test register route page
app.get('/register', (req, res) => {
  res.render('pages/register')
})

//post test register route page
app.post('/register', user_controller.register)

//get test login route page
app.get('/login', (req, res) => {
  res.render('pages/login')
})

//post test login route page
app.post('/login', user_controller.login)

//get test profile route page:
app.get('/profile', user_controller.profile)

//delete test login route page
app.post('/logout', user_controller.logout)



//listening port
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
