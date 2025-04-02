const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    content: {
      type: String,
      required: [true, "Comment content is required"],
    },
    group: {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      ref: "groups",
    },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("comments", commentSchema);

module.exports = commentModel;