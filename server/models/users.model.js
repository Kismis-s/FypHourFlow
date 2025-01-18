const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please input name!"],
    },
    email: {
        type: String,
        required: [true, "Please input email!"],
        unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"]
      },
    photo: {
        type: String, // Profile picture for OAuth users
      },
      provider: {
        type: String,
        enum: ["manual", "google"], // Distinguish manual and Google-authenticated users
        default: "manual",
      },
      googleId: {
        type: String, // Store Google-specific ID for OAuth users
        unique: true,
        sparse: true, // Allow null for manual login users
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },{
    timestamps: true,
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;