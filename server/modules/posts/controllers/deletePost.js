const mongoose = require("mongoose");

const deletePost = async (req, res) => {
  const PostModel = mongoose.model("posts");
  const GroupModel = mongoose.model("groups");
  const UserModel = mongoose.model("users");
  console.log("here");

  try {
    const postId = req.params.id;

    // Find the post
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const group = await GroupModel.findOne({ _id: post.group });
    // Check if the user is the author of the post
    if (
      post.author.toString() !== req.user._id.toString() ||
      group.creator.toString() !== req.user._id.toString() 
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }

    // Remove the post from the group's posts array
    await GroupModel.findByIdAndUpdate(
      { _id: post.group },
      { $pull: { posts: postId } }
    );

    // Remove the post from the user's posts array
    await UserModel.findByIdAndUpdate(
      { _id: req.user._id },
      { $pull: { posts: postId } }
    );

    // Delete the post
    await PostModel.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = deletePost;