//pull dependencies
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  // get Authentication header value
  const authHeader = req.header("Authorization");

  // if authentication header is not there, return error
  if (!authHeader) {
    return res.status(401).json({
      message: "Authentication empty, please try again",
    });
  }

  // check if Bearer is there, else return error
  if (authHeader.slice(0, 7) !== "Bearer ") {
    return res.status(401).json({
      message: "Authentication not valid, please try again",
    });
  }

  // if Bearer exists, get the actual JWT token
  const token = authHeader.slice(7);
  if (token.length === 0) {
    return res.status(401).json({
      message: "Authentication token is not valid",
    });
  }

  // set global var userAuth is JWT is valid
  const verified = jwt.verify(token, process.env.JWT_SECRET);

  // if verified set the token session in localstorage and move on to next middleware
  if (verified) {
    res.locals.userAuth = verified;
    next();
    return;
  }

  // at any point in time if the JWT is not valid, return error message
  return res.status(401).json({
      message: "Invalid token authentication"
  })
};
