const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    icon:{
        type: String,
        required: true,
    }
})

const Achievements = mongoose.model("achievements", achievementSchema);

module.exports= Achievements;