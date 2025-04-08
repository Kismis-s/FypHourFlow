const mongoose = require("mongoose");
const CommentModel = require("../../../models/comments.model");

const createComment = async (req, res) => {
  const PostModel = mongoose.model("posts");
  const UserModel = mongoose.model("users");
  const { groupId, postId } = req.params;
  const { content } = req.body;

  try {
    if (!content) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const newComment = await CommentModel.create({
      author: req.user._id,
      content,
      group: groupId,
    });
    await PostModel.findByIdAndUpdate(
      {
        _id: postId,
      },
      {
        $push: { comments: newComment._id },
      }
    );
    await UserModel.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $push: { comments: newComment._id },
      }
    );

    res.status(201).json({
      message: "Comment created successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = createComment;