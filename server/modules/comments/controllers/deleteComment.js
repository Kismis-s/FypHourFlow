const mongoose = require("mongoose");

const deleteComment = async (req, res) => {
  const CommentModel = mongoose.model("comments");
  const UserModel = mongoose.model("users");
  const commentId = req.params.id;

  try {
    const comment = await CommentModel.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        status: "error",
        message: "Comment not found",
      });
    }

    const PostModel = mongoose.model("posts");
    const GroupModel = mongoose.model("groups");

    const post = await PostModel.findOne({ comments: commentId });
    const group = await GroupModel.findOne({ _id: comment.group });
    if (
      comment.author.toString() !== req.user._id.toString() &&
      post.author.toString() !== req.user._id.toString() &&
      group.creator.toString() !== req.user._id.toString() 
    ) {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to delete this comment",
      });
    }

    await CommentModel.findByIdAndDelete(commentId);

    await UserModel.findByIdAndUpdate(
      { _id: req.user._id },
      { $pull: { comments: commentId } }
    );

    res.status(200).json({
      status: "success",
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while deleting the comment",
    });
  }
};

module.exports = deleteComment;