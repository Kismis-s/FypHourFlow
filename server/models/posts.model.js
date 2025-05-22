const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    postImages: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Post author is required"],
    },  
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "groups",
      required: [true, "Post must belong to a group"],
    },
    comments: {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      ref: "comments",
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
