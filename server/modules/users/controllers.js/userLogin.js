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
    
        // If coordinates are provided, update user location with latitude and longitude only
        if (coords) {
            // Commenting out the reverse geocoding part for now
            /*
            const positionStackApiKey = process.env.POSITION_STACK_API_KEY;  
            console.log("Position Stack API Key:", positionStackApiKey);
            const geoUrl = `http://api.positionstack.com/v1/reverse?access_key=${positionStackApiKey}&query=${coords.latitude},${coords.longitude}&output=json`;
            console.log("Making API request to:", geoUrl);

            try {
                const geoResponse = await axios.get(geoUrl);
                console.log("Position Stack API response:", geoResponse.data);

                if (geoResponse.data.error) {
                    console.error("Position Stack error:", geoResponse.data.error);
                } else if (geoResponse.data.data.length > 0) {
                    const addressComponents = geoResponse.data.data[0];

                    let city = null;
                    let country = null;

                    // Extract city, neighborhood, and country from address components
                    if (addressComponents.locality) {
                        city = addressComponents.locality;
                    }
                    if (addressComponents.country) {
                        country = addressComponents.country;
                    }

                    // If no city or neighborhood is found, we can fallback to other components
                    if (!city) {
                        city = "Unknown city";
                    }
                    if (!country) {
                        country = "Unknown country";
                    }

                    // Update user location with the parsed data
                    getUser.location = {
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        city: city,
                        country: country,
                    };

                    await getUser.save();
                } else {
                    console.warn("No results found for the given coordinates.");
                }
            } catch (geoError) {
                console.error("Failed to fetch location:", geoError.message);
            }
            */

            // Only storing latitude and longitude
            getUser.location = {
                latitude: coords.latitude,
                longitude: coords.longitude,
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
        accessToken
    });
};

module.exports = userLogin;
