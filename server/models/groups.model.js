const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    profile: {
      type: String,
    },
    skills: [{
        type: String,
        required: true, 
      }],
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    posts: {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      ref: "posts",
    },
    chatID: {
      type: String,
    },
  },
  { timestamps: true }
);

const groupModel = mongoose.model("groups", groupSchema);

module.exports = groupModel;