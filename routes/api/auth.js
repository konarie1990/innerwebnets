const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

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

module.exports = router;
