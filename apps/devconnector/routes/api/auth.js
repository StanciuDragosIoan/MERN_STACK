const express = require("express");


//enable express router
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");


// @route   GET api/auth
// @desc    Test Route
// @access  public

/*
     note how auth is added as 2nd param to the get()
     this makes the auth route protected
*/
router.get('/', auth, async (req,res)=> {
    try{
        //get user data (all but password)
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error..");
    }
});

module.exports = router;