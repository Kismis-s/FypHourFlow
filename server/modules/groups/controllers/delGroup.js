const mongoose = require("mongoose");
const PostModel = require("../../../models/posts.model");

const delGroup = async (req, res) => {
  const GroupModel = mongoose.model("groups");
  const UserModel = mongoose.model("users");

  try {
    const groupId = req.params.id;

    // Check if the group exists
    const group = await GroupModel.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if the user is the creator of the group
    if (group.creator.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this group" });
    }

    // Delete all posts associated with the group
    await PostModel.deleteMany({ group: groupId });

    // Remove the group from all members' groups array
    await UserModel.updateMany(
      { groups: groupId },
      { $pull: { groups: groupId } }
    );

    // Delete the group
    await GroupModel.findByIdAndDelete(groupId);

    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = delGroup;