const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/user');
const HttpError = require('../../models/http-error');

// @route   GET api/users
// @desc    Test route
// @access  Public

router.get('/', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId.userId).select('-password');
    res.json(user);
  } catch (err) {
    return next(
      new HttpError('Authentication failed, please try again later.', 500)
    );
  }
});

module.exports = router;
