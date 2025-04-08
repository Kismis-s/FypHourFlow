const mongoose = require("mongoose");
const axios = require("axios");

const leaveGroup = async (req, res) => {
  const GroupModel = mongoose.model("groups");
  const UserModel = mongoose.model("users");
  try {
    const groupId = req.params.id;

    // Check if the group exists
    const group = await GroupModel.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if the user is already a member of the group
    if (!group.members.includes(req.user._id)) {
      return res
        .status(400)
        .json({ message: "You are not a member of this group" });
    }

    // Add the user to the group
    group.members.pull(req.user._id);
    await group.save();

    // const creator = await GroupModel.findById(group.creator);
    // const stdForChat = await UserModel.findById(req.user._id);
    // await axios.put(
    //   `https://api.chatengine.io/chats/${group.chatID}/people/`,
    //   {
    //     username: stdForChat.email,
    //   },
    //   {
    //     headers: {
    //       "Project-ID": process.env.project_id,
    //       "User-Name": creator.email,
    //       "User-Secret": creator.password,
    //     },
    //   }
    // );
    // Update the user's groups array
    await UserModel.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $pull: { groups: groupId },
      }
    );

    res.status(200).json({ message: "Left group successfully" });
  } catch (error) {
    console.error("Error joining group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = leaveGroup;