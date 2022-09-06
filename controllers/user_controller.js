const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports = {
  register: async (req, res) => {
    //get validated values from req.body
    const validatedValues = req.body;
    //find validated users from database
    try {
      const user = await userModel.findOne({ email: validatedValues.email });
      //if user email already exists in database, return error
      if (user) {
        return res.status(409).json({ error: "user already exists" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "unable to get user" });
    }

    //check if password is the same
    if (validatedValues.password !== validatedValues.confirmPassword) {
      res.send(
        "Password and confirm password does not match. Please try again"
      );
      return;
    }

    //else encrypt password with hash and store all their other details as well into database
    const passwordHash = await bcrypt.hash(req.body.password, 20);
    const user = { ...req.body, password: passwordHash };

    //if error in creating user, return error
    //else continue and return json format
    try {
      await userModel.create(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "unable to register user" });
    }

    res.redirect("/");
  },

  login: async (req, res) => {
    //do necessary validations
    //initialise validated Values
    const validatedValues = req.body;
    console.log('validatedValues.email:', validatedValues.email);
    let user = null;

    //try catch statement to see if user matches the one in database
    //else return error
    try {
      user = await userModel.findOne({ email: validatedValues.email });
      console.log('user:', user)
      if (!user) {
        return res.status(401).json({ err: "email or password is not valid" });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ err: "unable to retrieve user information" });
    }

    //check if password is alright and matches the hash in the one in database
    const isPasswordOk = await bcrypt.compare(req.body.password, user.password);
    console.log('isPasswordOk: ', isPasswordOk)

    //if password hash does not match return error
    if (!isPasswordOk) {
      return res.status(401).json({ error: "email or password is not valid" });
    }

    //generate JWT and return a response
    const userData = {
      name: user.name,
      email: user.email,
      job: user.job,
      experience: user.experience,
      skills: user.skills
  }

  console.log('userData:', userData)

  const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: userData,
      },
      process.env.JWT_SECRET
    );

    console.log('token:',token)

    //redirect to profile loggedin page
    //res.redirect('/profile')
    res.send('Successfully login')

  },

  profile: async (req, res) => {


    let user = null
    let userAuth = res.locals.userAuth
    console.log(userAuth)

    if (!userAuth) {
        return res.status(401).json()
    }
    try {
        user = await userModel.findOne({ email: user.email })
        if (!user) {
            return res.status(404).json()
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: "failed to get user"})
    }

    const userData = {
        name: user.name,
        email: user.email,
        job: user.job,
        experience: user.experience,
        skills: user.skills
    }

    return res.json(userData)
},

  logout: async (req, res) => {
    req.session.user = null;

    req.session.save(function (err) {
      if (err) {
        res.redirect("/");
        return;
      }

      //regenerate session
      req.session.regenerate(function (err) {
        if (err) {
          res.redirect("/home");
          return;
        }
      });
      //remove JWT token from localstorage and return to home guest login page
      //localStorage.removeItem(token);

      res.send("successfully logged out");
    });
  },

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
