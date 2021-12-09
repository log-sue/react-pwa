const express = require('express');
const router = express.Router();

// User information
const user = require('./user.js');
router.use('/user', user);

module.exports = router;