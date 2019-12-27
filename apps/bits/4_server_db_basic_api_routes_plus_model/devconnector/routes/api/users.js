const express = require("express");


//enable express router
const router = express.Router();


// @route   GET api/users
// @desc    Test Route
// @access  public
router.get('/', (req,res)=> res.send("User route..."));

module.exports = router;