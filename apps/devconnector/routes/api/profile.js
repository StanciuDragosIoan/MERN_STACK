const express = require("express");


//enable express router
const router = express.Router();

const auth = require("../../middleware/auth");

const profile = require("../../models/Profile");
const user = require("../../models/User");
const { check, validationResult } = require("express-validator");

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req,res)=> {
    try {
        //this user:req.user.id pertains to the 'user' fields in the Profile.js model
        const profile = await Profile.findOne({ user: req.user.id })
            //populate takes in the user model as 1st param and the fields to bring from it as 
            //2nd array param
            .populate("user", ["name", "avatar"]);

        
        if(!profile){
            return res.status(400).json({
                msg: "There is no profile for this user.."
            });
        }

        res.json(profile);
    }catch(err){
        console.error(err.message); 
        res.status(500).send("Server error..");
    }
});


    // @route   POST api/profile
    // @desc    create or update a user profile
    // @access  Private
    router.post("/", 
        [
            auth,
                [
                    check("status", "Status is required").not().isEmpty(),
        
                    check("skills", "Skills is required").not().isEmpty()
                ]
        ], 
        
        async (req, res) => {
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }

            const {
                company,
                website,
                location,
                bio,
                status,
                githubusername,
                skills,
                youtube,
                facebook,
                twitter,
                instagram,
                linkedin
            } = req.body;


            //build profile object
            const profileFields = {

            }

            profileFields.user = req.user.id;

            if (company) profileFields.company = company;
            if (website) profileFields.website = website;
            if (location) profileFields.location = location;
            if (bio) profileFields.bio = bio;
            if (status) profileFields.status = status;
            if (githubusername) profileFields.githubusername = githubusername;

            if(skills) {
                profileFields.skills = skills.split(",").map(skill => skill.trim());
            }


            //build social object
            profileFields.social = {

            }

            if (youtube) profileFields.social.youtube = youtube;
            if (twitter) profileFields.social.twitter = twitter;
            if (facebook) profileFields.social.facebook = facebook;
            if (linkedin) profileFields.social.linkedin = linkedin;
            if (instagram) profileFields.social.instagram = instagram;

            try{    

                //look for profile in the DB
                let profile = await Profile.findOne({ user: req.user.id });
                
                //if found, update it
                if(profile){
                    //update profile
                    profile = await Profile.findOneAndUpdate(
                        { 
                            user: req.user.id 
                        }, 
                        
                        { 
                            $set: profileFields
                        }, 
                        
                        {
                            new: true
                        }
                    );

                    //return the entire profile
                    return res.json(profile);
                }




                // if not found Create new profile
                profile = new Profile(profileFields);

                await profile.save();

                res.json(profile);

            }catch(err){
                console.error(err.message);
                res.statis(500).send("Server error..");
            }
        }

);




    // @route   GET api/profile
    // @desc    GET all profiles
    // @access  Public

    router.get('/', async (req,res) => {
        try {
            //get profile + name and avatar of the user
           const profiles = await Profile.find().populate("user", ["name", "avatar"]);

           res.json(profiles);
        } catch(err){

            console.error(err.message);
            
            res.status(500).send("Server error..");

        }
    });


module.exports = router;