const mongoose = require("mongoose");

const getAllPosts = async (req, res) => {
  const PostModel = mongoose.model("posts");
  const {groupId} = req.query;
  try {
    const posts = await PostModel.find({
      group: groupId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getAllPosts;