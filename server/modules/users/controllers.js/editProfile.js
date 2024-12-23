const mongoose = require("mongoose");

const editProfile = async (req, res) =>{
    const Users = mongoose.model("users");

    const {name, email} = req.body;

    try{
        const updateProfile = await Users.updateOne({
            _id: req.user._id
        },{
            name: name,
            email:email
        },{
            runValidators: true
        })
        if (updateProfile.nModified === 0) { // No changes made
            return res.status(400).json({
                status: "Failed!",
                message: "No changes made to the profile."
            });
        }
    }catch(e){
        res.status(400).json({
            status: "Failed!",
            error: e.message
        })
        return;
    }
    res.status(200).json({
        status: "Profile updated!",
    })
}

module.exports = editProfile;