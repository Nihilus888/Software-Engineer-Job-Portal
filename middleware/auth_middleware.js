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
  if(authHeader.slice(0, 7) !== 'Bearer ') {
      return res.status(401).json({
        message: 'Authentication not valid, please try again'
      })
  }

};
