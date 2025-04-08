const mongoose = require("mongoose");

const getAllComment = async (req, res) => {
  const CommentModel = mongoose.model("comments");

  try {
    const comments = await CommentModel.find();

    if (comments.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No comments found",
      });
    }

    res.status(200).json({
      status: "success",
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while fetching comments",
    });
  }
};

module.exports = getAllComment;