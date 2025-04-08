const mongoose = require("mongoose");

const updatePost = async (req, res) => {
  const PostModel = mongoose.model("posts");
  const GroupModel = mongoose.model("groups");

  try {
    const postId = req.params.id;
    const { content } = req.body;

    // Find the post
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user is the author of the post
    if (post.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this post" });
    }

    // Check if the group exists
    const group = await GroupModel.findById(post.group);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if the user is still a member of the group
    if (!group.members.includes(req.user._id)) {
      return res
        .status(403)
        .json({ message: "You are no longer a member of this group" });
    }

    // Update the post
    const updatedPost = await PostModel.findByIdAndUpdate(
      { _id: postId },
      { content },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updatePost;