const mongoose = require("mongoose");

const getGroupById = async (req, res) => {
  const GroupModel = mongoose.model("groups");
  try {
    const groupId = req.params.id;

    // Find the group by ID
    const group = await GroupModel.findById(groupId).populate("owner");

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (group.members && group.members.includes(req.user._id)) {
      return res.status(200).json({ group });
    }

    res.status(200).json({ group });
  } catch (error) {
    console.error("Error retrieving group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getGroupById;