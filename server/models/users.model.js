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
        type: String,
        default: null
    },
    cover: {
      type: String,
      default: null
    },
    birthday: {
      type: String, 
    },
    profession: {
      type: String, 
    },
    phone: {
      type: Number, 
      match: [/^\d{10}$/, "Please provide a valid phone number!"],
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
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    balance: {
        type: Number,
        required: [true, "Balance is required!"]
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
      },
      city: String,
      country: String,
    },
    skills: {
      type: [String],
      default: []
    },
    openServices: {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      ref: "services",
      default: []
    },
    ongoingServices: {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      ref: "services",
      default: []
    },
    completedServices: {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      ref: "services",
      default: []
    },
    },{
    timestamps: true,
})

userSchema.index({ location: "2dsphere" });

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;