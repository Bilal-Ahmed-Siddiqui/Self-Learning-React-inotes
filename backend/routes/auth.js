const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Importing the User model
const { body, validationResult } = require("express-validator"); // Importing express-validator for request body validation
const bcrypt = require("bcryptjs"); // Importing bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Importing jsonwebtoken for token generation
require("dotenv").config({ path: ".env.local" }); // Loading environment variables from .env.local file
const fetchUser = require("../middleware/fetchUser");

// Route to handle user registration /api/auth/signup
router.post(
  "/signup",
  [
    // Validation middleware for request body fields
    body("name", "enter a valid name").isLength({ min: 5 }), // Name must be at least 5 characters long
    body("email", "enter a valid email").isEmail(), // Email must be a valid email address
    body("password", "password must be at least 5 letters long").isLength({
      min: 5,
    }), // Password must be at least 5 characters long
  ],
  async (req, res) => {
    // Async route handler function
    const result = validationResult(req); // Get validation result from request
    if (result.isEmpty()) {
      // If there are no validation errors
      try {
        let emailExists = await User.findOne({ email: req.body.email }); // Check if email already exists in the database
        if (emailExists) {
          // If email exists, return error
          return res
            .status(400)
            .json({ error: "A user with this email already exists!" });
        }
        const salt = await bcrypt.genSalt(10); // Generate salt for password hashing
        const secPass = await bcrypt.hash(req.body.password, salt); // Hash the password
        // user creation
        const newUser = User({
          name: name,
          email: email,
          password: sec_pass,
        });
        newUser.save();
        const UID = {
          user: {
            id: newUser.id,
          },
        };
        const token = jwt.sign(UID, process.env.JWT_SECRET); // Generate JWT token
        // return res.send(req.body); // Return user data (for testing)
        return res.send({ token }); // Return token to client
      } catch (error) {
        res.status(500).json({ error: "Some error occurred!" }); // Internal server error
      }
    }
    res.status(400).json(result.array()); // Return validation errors
  }
);

// Route to handle user login /api/auth/login
router.post(
  "/login",
  [
    // Validation middleware for request body fields
    body("email", "enter a valid email").isEmail(), // Email must be a valid email address
    body("password", "password must be at least 5 letters long").isLength({
      min: 5,
    }), // Password must be at least 5 characters long
  ],
  async (req, res) => {
    // Async route handler function

    try {
      const result = validationResult(req); // Get validation result from request
      if (!result.isEmpty()) {
        // If there are no validation errors
        res.status(400).json(result.array()); // Return validation errors
      }
      const { email, password } = req.body;

      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Wrong email or password" });
      }
      const passCheck = await bcrypt.compare(password, user.password);
      if (!passCheck) {
        return res.status(400).json({ error: "Wrong email or password" });
      }

      const UID = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(UID, process.env.JWT_SECRET); // Generate JWT token
      return res.send({ token }); // Return token to client
    } catch (error) {
      res.status(500).json({ error: "Internal server error" }); // Internal server error
    }
  }
);

// Route to fetch user data /api/auth/fetchuser
router.get("/fetchuser", fetchUser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error!");
  }
});
module.exports = router; // Export router for use in other files
