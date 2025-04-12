const mongoose = require("mongoose");

const getGroupById = async (req, res) => {
  const GroupModel = mongoose.model("groups");
  try {
    const groupId = req.params.id;

    const group = await GroupModel.findById(groupId)
  .populate('creator', 'name photo')
  .populate({
    path: 'posts',
    populate: {
      path: 'author',
      select: 'name photo'
    }
  });


    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({ group }); 
  } catch (error) {
    console.error("Error retrieving group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getGroupById;
