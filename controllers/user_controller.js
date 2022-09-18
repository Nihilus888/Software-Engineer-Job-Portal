const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const userValidators = require("../controllers/validators/users");
const mongoose = require("mongoose");
const user = require("../models/user");

module.exports = {
  register: async (req, res) => {
    //get validated values from req.body
    const validateUser = userValidators.createUser.validate(req.body);
    console.log("validatedUser:", validateUser);

    if (validateUser.error) {
      console.log("validateUser.error: ", validateUser.error);
      res.send(validateUser.error);
      return;
    }

    //get values from validated users
    const validatedValues = validateUser.value;
    console.log("validatedValues: ", validatedValues);
    console.log("validatedValuesSkill", validatedValues.skills);

    //find validated users from database
    try {
      const user = await userModel.findOne({ email: validatedValues.email });
      //if user email already exists in database, return error
      if (user) {
        return res.status(409).json({ error: "user already exists" });
      }
    } catch (err) {
      console.log("find err: ", err);
      return res.status(500).json({ error: "unable to get user" });
    }

    //check if password is the same
    /*
    if (validatedValues.password !== validatedValues.confirmPassword) {
      res.send(
        "Password and confirm password does not match. Please try again"
      );
      return;
    }
    */

    //else encrypt password with hash and store all their other details as well into database
    const passwordHash = await bcrypt.hash(req.body.password, 5);
    const user = { ...req.body, password: passwordHash };
    console.log("passwordHash: ", passwordHash);
    console.log("user: ", user);

    //if error in creating user, return error
    //else continue and return json format
    try {
      await userModel.create(user);
      console.log("successfully created user");
    } catch (err) {
      console.log("create err: ", err);
      return res.status(500).json({ error: "unable to register user" });
    }
    return res.json("user successfully registered");
  },

  login: async (req, res) => {
    //do necessary validations
    //initialise validated Values
    const validatedValues = req.body;
    console.log("validatedValues.email:", validatedValues.email);
    let user = null;

    //try catch statement to see if user matches the one in database
    //else return error
    try {
      user = await userModel.findOne({ email: validatedValues.email });
      console.log("user:", user);
      console.log();
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
    console.log("isPasswordOk: ", isPasswordOk);

    //if password hash does not match return error
    if (!isPasswordOk) {
      return res.status(401).json({ error: "email or password is not valid" });
    }

    //generate JWT and return a response
    const userData = {
      name: user.name,
      id: user._id,
      email: user.email,
      job: user.job,
      experience: user.experience,
      skills: user.skills,
    };

    const userDataId = {
      id: user._id
    }

    console.log('userDataId', userDataId)

    console.log("userData:", userData);

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: userData,
      },
      process.env.JWT_SECRET
    );

    console.log("token:", token);

    //redirect to profile loggedin page
    //return token and on frontend success, store the token on localstorage and
    //whatever else
    res.json({ token });
  },

  profile: async (req, res) => {
    let user = req.params.id;
    console.log("req.params.id:", req.params.id);
    let userId = mongoose.Types.ObjectId(user);

    try {
      user = await userModel.findOne({ _id: userId });
      console.log("user:", user);
      if (!user) {
        return res.status(404).json();
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "failed to get user" });
    }

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      password: "",
      job: user.job,
      position: user.position,
      experience: user.experience,
      skills: user.skills,
    };

    console.log("userData: ", userData);

    return res.json(userData);
  },

  editProfile: async (req, res) => {
    let token = res.locals.userAuth;
    console.log("token: ", token);
    let Id = token.data.id;
    console.log("Id:", Id);
    let userId = mongoose.Types.ObjectId(Id);
    console.log("userId: ", userId);

    const validationResults =  userValidators.createUser.validate(req.body);;
    console.log("validationResults:", validationResults);

    if (validationResults.error) {
      res.json(validationResults.error.details[0].message);
      return;
    }
    
    const validatedResults = validationResults.value;
    console.log("ValidationResults: ", validatedResults);

    const passwordHash = await bcrypt.hash(req.body.password, 5);
    const userInformation = { ...req.body, password: passwordHash };
    console.log("passwordHash: ", passwordHash);
    console.log("user: ", user);

    try {
      await user.findByIdAndUpdate(userId, userInformation);
    } catch (err) {
      console.log(err);
    }
    console.log("update successful");
    res.json("update successful");
  },

  deleteProfile: async (req, res) => {
    let token = res.locals.userAuth
    console.log('token: ', token)
    let Id = token.data.id
    console.log('Id:', Id)
    let userId = mongoose.Types.ObjectId(Id)
    console.log('userId: ', userId)

    try {
      await user.findByIdAndDelete(userId);
      console.log('user: ', user)
    } catch (err) {
      console.log(err);
    }
    console.log("delete profile successful");
    res.json('delete successful')
  },

  deleteProfile: async (req, res) => {
    let token = res.locals.userAuth;
    console.log("token: ", token);
    let Id = token.data.id;
    console.log("Id:", Id);
    let userId = mongoose.Types.ObjectId(Id);
    console.log("userId: ", userId);

    try {
      await user.findByIdAndDelete(userId);
      console.log("user: ", user);
    } catch (err) {
      console.log(err);
    }
    console.log("delete profile successful");
    res.json("delete successful");
  },

  logout: async (req, res) => {
    let token = res.locals.userAuth;
    console.log('token backend:', token)

    try {
      //if token is not there, immediately logout
      if (!token) {
        return res.status(404).json({message: 'token is not found', status: 404})
      }
    } catch (err) {
      console.log(err)
      res.status(404).json({err: 'unable to logout', status: 404})
    }

      //remove JWT token from localstorage and return to home guest login page
      //localStorage.removeItem(token);
      //localStorage.clear()
      
      console.log('successfully logged out')
      res.json("logged out successful");
  },
};
