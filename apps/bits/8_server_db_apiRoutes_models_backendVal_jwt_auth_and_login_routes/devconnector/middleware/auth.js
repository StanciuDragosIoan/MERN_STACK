const jwt = require("jsonwebtoken");
const config = require("config");


/*
    takes in request and response object + a callback that we have to run so that 
    it moves on to the next piece of middleware
*/

module.exports = function(req, res, next) {
    //get token from the header 
    const token = req.header("x-auth-token");

    //check if no token
    if(!token){
        return res.status(401).json({ msg: "No token, authorization denied.."});
    }

    //verify the token (if there is 1)
    try {
        //jwt.verify() takes in the token and the secret
        const decoded = jwt.verify(token, config.get("jwtSecret"));

        /*
            send request.user to the user from the token (user had been sent as 
            id through the payload)

            req.user can then be used in any routes (for instance to get the user profile)
        */
        req.user = decoded.user;

        next();
    } catch(err){
        res.status(401).json({ msg: "Token is not valid..."});
    }
}