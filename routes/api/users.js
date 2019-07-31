const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// Validate that a user needs to enter Name, Email and Password:
// See docs for more info on express validator: https://express-validator.github.io/docs/
const { check, validationResult } = require('express-validator');

// bring in the user model
const User = require('../../models/User');

// @route       GET api/users
// @description Register User
// @access      Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'You must include a valid email').isEmail(),
    check(
      'password',
      'You must enter a password with 6 or more characters'
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);

    // Destructure the req.body so we don't have to keep using that
    const { name, email, password } = req.body;

    try {
      // Check to see if the user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      // Grab the user's gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Encrypt the password using bcrypt
      // Save the user to the db (use await because it's returning a promise)
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      // Return the jsonwebtoken
      // Visit https://jwt.io/ for specific info - first sign, then pass in payload

      const payload = {
        user: {
          // you don't need the underscore with mongoose - it uses abstraction
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
