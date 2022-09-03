const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports = {
  //register
    //do necessary validations
    //get validated values from req.body
    //find validated users from database

    //if user already exists in database, return error
    //else encrypt password with hash and store all their other details as well into database
  
    //if error in creating user, return error
    //else continue and return json format

  //login
    //do necessary validations
    //initialise validated Values

    //try catch statement to see if user matches the one in database
    //compare password hash to each other
    //if password hash does not match return error
    //generate JWT and return a response

  //profile
    //initialise user and user authentication
    //if user authentication has error return error
    //else try catch statement to see if user can be found in database

    //set user data as their name and email
    //can follow the one in express-animal-shelter

  //logout
    //remove JWT token from localstorage and return to home guest login page



//Job controllers for brainstorming
  //create jobs from user
    //middleware authentication
    //if not authenticated or session expire, route back to login page
    //else go onto create jobs page
    //POST job information into database

  //save jobs for user
    //middleware authentication
    //if save, assign job to user and update it in the user database

  //delete jobs for user
    //middleware authentication
    //if delete, delete job from user and update it in the user database

  //update jobs for user
    //middleware authentication
    //update job details 
    //if it does not fit data schema, return error
    //else continue update
};
