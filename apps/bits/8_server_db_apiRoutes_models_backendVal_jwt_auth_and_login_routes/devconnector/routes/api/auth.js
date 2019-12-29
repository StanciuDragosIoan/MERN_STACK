const express = require("express");


//enable express router
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");


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


// @route   POST api/auth
// @desc    Authenticate User and get token
// @access  public (so we can get the token and make requests to public routes)
router.post('/', [
    check("email", "Please include a valid e-mail").isEmail(),

    check("password", "Password is required..").exists()
],
async (req,res)=> {
    // console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }


    //destructure payload
    const { email, password } = req.body;

    try {
            
        
        //see if user does not exist (send error if it doesn't )
        let user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({ errors: [ { msg: "Invalid credentials.."}]});
        }

       
        //match user and password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({ errors: [ { msg: "Invalid credentials.."}]});
        }

        //get payload
        const payload = {
            user: {
                id: user.id
            }
        }


        //sign the token
        jwt.sign(
            //pass in payload, secret, set expiration
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000},
            //callback throws error or returns token if no error
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        );
        // res.send("User registered...");

    } catch(err){
        console.error(err.message);
        res.status(500).send("Server error..");
    }

});

module.exports = router;