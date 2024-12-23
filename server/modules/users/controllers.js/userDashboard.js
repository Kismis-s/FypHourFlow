const mongoose = require("mongoose");

const userDashboard = async (req, res)=>{
    const Users = mongoose.model("users");

    const getUserData = await Users.findOne({
        _id: req.user._id
    }).select("name email");
    res.status(200).json({
        message: "Welcome to user dashboard!",
        data: getUserData
    })
}

module.exports = userDashboard;