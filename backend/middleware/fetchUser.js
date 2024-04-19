const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env.local" }); // Loading environment variables from .env.local file

const fetchUser = (req, res, next) => {
  //get the user from jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please provide a valid token" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please provide a valid token" });
  }
};

module.exports = fetchUser;
