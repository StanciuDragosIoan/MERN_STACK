const express = require("express");


//enable express router
const router = express.Router();


// @route   GET api/posts
// @desc    Test Route
// @access  public
router.get('/', (req,res)=> res.send("Posts route..."));

module.exports = router;