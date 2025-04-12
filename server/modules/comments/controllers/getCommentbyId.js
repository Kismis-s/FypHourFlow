const mongoose = require("mongoose");

const getCommentById = async (req, res) => {
  const CommentModel = mongoose.model("comments");
  const commentId = req.params.id;

  try {
    const comment = await CommentModel.findById(commentId).populate("author", "name", "photo");

    if (!comment) {
      return res.status(404).json({
        status: "error",
        message: "Comment not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: comment,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while fetching the comment",
    });
  }
};

module.exports = getCommentById;