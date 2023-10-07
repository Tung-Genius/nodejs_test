const express = require("express");

const User = require('../app/models/userModel');
const authController = require("../app/controllers/authController");
const router = express.Router();
const { validationResult,body } = require('express-validator');

const validate = (validations) => {
    return async (req, res, next) => {
      for (let validation of validations) {
        const result = await validation.run(req);
        if (result.errors.length) break;
      }
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
  
      res.status(400).json({ success: false, message: "Validate fail", errors: errors.array() });
    };
};

const validateSignup = [
    body("name").isString().isLength({ min: 6 }),
    body('email').isEmail().custom( async (value) => {
      try {
        const user = await User.findOne({email: value})
        if (user) {
         return Promise.reject('Email is also exist');
        }
       } catch (e) {
        console.log(e);
       }
    }),
    body("password").isLength({ min: 6 }),
]

const validateLogin = [
  body('email').isEmail().isLength({ min: 8}),
  body("password").isLength({ min: 6 }),
]

// Auth
router.post("/signup", validate(validateSignup), authController.signup);
router.post("/login", validate(validateLogin),authController.login);

module.exports = router;
