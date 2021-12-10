const express = require('express');
const router = express.Router();

// User information
const user = require('./user.js');
router.use('/user', user);

// Contents information
const contents = require('./contents.js');
router.use('/contents', contents);

module.exports = router;