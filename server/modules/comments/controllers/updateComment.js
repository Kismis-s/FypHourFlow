const mongoose = require("mongoose");

const updateComment = async (req, res) => {
  const CommentModel = mongoose.model("comments");
  const commentId = req.params.id;
  const { content } = req.body;

  try {
    if (!content) {
      return res.status(400).json({
        status: "error",
        message: "Comment content is required",
      });
    }

    const comment = await CommentModel.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        status: "error",
        message: "Comment not found",
      });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to update this comment",
      });
    }

    const updatedComment = await CommentModel.findByIdAndUpdate(
      commentId,
      { content },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      message: "Comment updated successfully",
      data: updatedComment,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while updating the comment",
    });
  }
};

module.exports = updateComment;