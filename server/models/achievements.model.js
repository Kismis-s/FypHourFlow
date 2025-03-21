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
    achievementImages:{
        type: String,
        required: true,
    },
    requiredTimeCredits: { 
        type: Number, 
        required: true 
    }, 
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

const Achievements = mongoose.model("achievements", achievementSchema);

module.exports= Achievements;