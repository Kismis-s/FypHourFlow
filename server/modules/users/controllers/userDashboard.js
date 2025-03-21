const mongoose = require("mongoose");

const userDashboard = async (req, res)=>{
    const Users = mongoose.model("users");
    const Transactions = mongoose.model("transactions");

    const getTransactions = await Transactions.find({
        user_id: req.user._id
    }).sort("-createdAt")//shows from the back
    .select("amount remarks transaction_type")
    .limit(10)
    .populate("sender", "name") 
    .populate("receiver", "name");

    const getUserData = await Users.findOne({
        _id: req.user._id
    }).populate("openServices")
    .populate({
        path: "ongoingServices",
        populate: [
            { path: "client", select: "name" },  
            { path: "provider", select: "name" }
        ]
    })
    .populate({
        path: "completedServices",
        populate: [
            { path: "client", select: "name" },  
            { path: "provider", select: "name" }
        ]
    })
    .populate("createdOffers")
    .populate("claimedOffers")
    .populate("achievementBadges")
    
    res.status(200).json({
        message: "Welcome to user dashboard!",
        data: getUserData,
        transac: getTransactions
    })
}

module.exports = userDashboard;