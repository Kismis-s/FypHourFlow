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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    balance: {
        type: Number,
        required: [true, "Balance is required!"]
    },
    groups: {
      type: [String],
    },
    posts: {
      type: [String],
    },
    comments: {
      type: [String],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: undefined
      },
      coordinates: {
        type: [Number], 
      },
    },
    city: {type: String},
    country: {type: String},
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
    },createdOffers: {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      ref: "offers",
      default: []
    },
    claimedOffers: {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      ref: "offers",
      default: []
    },
    
    achievementBadges: {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      ref: "achievements",
      default: []
    },
    review: {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      ref: "Review",
    },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    },{
    timestamps: true,
})

userSchema.index(
  { location: "2dsphere" },
  { partialFilterExpression: { "location.coordinates": { $exists: true } } }
);


const userModel = mongoose.model("users", userSchema);

module.exports = userModel;