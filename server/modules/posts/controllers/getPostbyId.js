const mongoose = require("mongoose");

const getPostById = async (req, res) => {
  const PostModel = mongoose.model("posts");
  try {
    const postId = req.params.id;
   
    const post = await PostModel.findById(postId).populate("author", "name");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getPostById;