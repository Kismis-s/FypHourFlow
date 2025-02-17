const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
    const Users = mongoose.model("users");

    const { email, password, coords } = req.body;

    try {
        // Validations
        if (!email) throw new Error("Please input email.");
        if (!password) throw new Error("Please input password.");
    
        const getUser = await Users.findOne({ email: email });
        if (!getUser) throw new Error("The email does not exist!");
    
        const matchedPassword = await bcrypt.compare(password, getUser.password);
        if (!matchedPassword) throw new Error("The password does not match!");
    
        if (coords) {

            // Only storing latitude and longitude
            getUser.location = {
                type: "Point",
                coordinates: [coords.longitude, coords.latitude],
            };

            await getUser.save();
        }
    } catch (e) {
        res.status(400).json({
            status: "Failed to login.",
            message: e.message || "An unknown error occurred.",
        });
        return;
    }
    
    const getUserForAccessToken = await Users.findOne({
        email: email
    });

    const accessToken = await jwt.sign({
        _id: getUserForAccessToken._id,
        name: getUserForAccessToken.name,
        email: getUserForAccessToken.email,
    }, process.env.jwt_salt);

    res.status(200).json({
        status: "Logged in!",
        accessToken,
        id:getUserForAccessToken._id
    });
};

module.exports = userLogin;
