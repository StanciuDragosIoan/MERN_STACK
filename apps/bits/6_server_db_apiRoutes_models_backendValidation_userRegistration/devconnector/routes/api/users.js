const express = require("express");


//enable express router
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const { check, validationResult } = require("express-validator");


const User = require("../../models/User");

// @route   POST api/users
// @desc    Register User
// @access  public
router.post('/', [
    check("name", "Name is required...").not().isEmpty(),

    check("email", "Please include a valid e-mail").isEmail(),

    check("password", "Please enter a password with 6 or more characters").isLength({
        min: 6
    })
],
async (req,res)=> {
    // console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }


    //destructure payload
    const { name, email, password } = req.body;

    try {
            
        
        //see if user exists
        let user = await User.findOne({ email });

        if(user){
            return res.status(400).json({ errors: [ { msg: "User already exists.."}]});
        }

        /*
            get user's gravatar (based on e mail) this will be 
            used when registering user
        */
        const avatar = gravatar.url(email, { 
            s: "200",
            r: "pg",
            d: "mm"
        });

        //instantiate user
        user = new User({
            name,
            email,
            avatar,
            password
        })

        // encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        //save user to db
        await user.save();

        //return jsonwebtoken (we return the json webtoken so that the user is logged in as soon
        //as he registers)


        res.send("User registered...");

    } catch(err){
        console.error(err.message);
        res.status(500).send("Server error..");
    }

});

module.exports = router;