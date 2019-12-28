const express = require("express");


//enable express router
const router = express.Router();


// @route   GET api/auth
// @desc    Test Route
// @access  public
router.get('/', (req,res)=> res.send("Auth route..."));

module.exports = router;