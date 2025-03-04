const mongoose = require("mongoose");

const getOffers = async (req, res) =>{
    const Offers = mongoose.model("offers");

    try{
        const allOffers = await Offers.find().populate("offerProvider");

        res.status(200).json({
            message: "Get all offers succesful!!",
            data: allOffers
        })

    }
    catch (e){
        res.status(400).json({
            message: "Get all offers failed!",
            error: e.message
        })
        return;
    }
    
}

module.exports = getOffers;