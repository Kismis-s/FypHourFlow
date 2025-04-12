const mongoose = require("mongoose");

const createPost = async (req, res) => {
  const PostModel = mongoose.model("posts");
  const GroupModel = mongoose.model("groups");
  const UserModel = mongoose.model("users");
  try {
    const groupId = req.params.id;
    const { content } = req.body;

    // Check if the group exists
    const group = await GroupModel.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if the user is a member of the group
    if (!group.members.includes(req.user._id)) {
      return res
        .status(403)
        .json({ message: "You are not a member of this group" });
    }

    // Create the new post
    const newPost = await PostModel.create({
      content,
      author: req.user._id,
      group: groupId,
    });

    // Update the group's posts array
    await GroupModel.findByIdAndUpdate(
      {
        _id: groupId,
      },
      {
        $push: { posts: newPost._id },
      }
    );

    // Update the user's posts array
    await UserModel.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $push: { posts: newPost._id },
      }
    );

    res.status(201).json({
      status: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = createPost;