const express = require("express");


//enable express router
const router = express.Router();

const { check, validationResult } = require("express-validator");


// @route   POST api/users
// @desc    Register User
// @access  public
router.post('/', [
    check("name", "Name is required...").not().isEmpty(),

    check("email", "Please include a valid e-mail").isEmail(),

    check("password", "Please enter a password with 6 or more characters").isLength({
        min: 6
    })
], (req,res)=> {
    // console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }
    res.send("User route...");

});

module.exports = router;