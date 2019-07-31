const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
// Validate that a user needs to enter Name, Email and Password:
// See docs for more info on express validator: https://express-validator.github.io/docs/
const { check, validationResult } = require('express-validator');

const Uer = require('../../models/User');

// @route       GET api/auth
// @description Test route
// @access      Public

// auth protects the route
router.get('/', auth, async (req, res) => {
  try {
    // don't return the password - use .select('-password')
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).sendStatus('Server Error');
  }
});

// @route       GET api/auth
// @description Authenticate User & get token
// @access      Public
router.post(
  '/',
  [
    check('email', 'You must include a valid email').isEmail(),
    check('password', 'You must enter a password').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);

    // Destructure the req.body so we don't have to keep using that
    const { email, password } = req.body;

    try {
      // Check to see if the user exists and send same message for both user and password (security reasons)
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

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
