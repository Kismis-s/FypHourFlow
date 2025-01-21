const jwt = require("jsonwebtoken");

const auth = (req, res, next) =>{
    const authorizationHeader = req.headers.authorization;
    console.log(authorizationHeader);
    if(!authorizationHeader){
        res.status(401).json({
            status: "Failed!",
            message: "Authorrization failed! You must be logged in!"
        })
        return;
    }

    const token = authorizationHeader.split("Bearer ")[1];
    try{
        console.log("Token:", token);
        console.log("JWT Secret:", process.env.jwt_salt);
        const checkToken = jwt.verify(token, process.env.jwt_salt);
        req.user = checkToken;//so that another function can access it
        console.log("User authenticated:", req.user);
    }catch(e){
        console.error("Token verification error:", e);
        res.status(401).json({
            status: "Failed!",
            message: "The access token is incorrect! Access denied!"
        })
        return;
    }
    next();
}

module.exports = auth;