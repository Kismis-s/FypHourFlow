const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const GroupModel = mongoose.model("groups");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "groupImages/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images only!");
    }
  },
}).fields([{ name: "groupImages", maxCount: 1 }]);

const updateGroup = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ status: "Failed!", message: err });
    }

    try {
      const groupId = req.params.id;
      const { name, description } = req.body;
      const groupImages = req.files?.groupImages ? req.files.groupImages[0].filename : null;

      const group = await GroupModel.findById(groupId);
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }

      if (group.creator.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "You are not authorized to update this group" });
      }

      const updatedGroup = await GroupModel.findByIdAndUpdate(
        groupId,
        {
          name,
          description,
          ...(groupImages && { image: groupImages }),
        },
        { new: true, runValidators: true }
      );

      res.status(200).json({
        message: "Group updated successfully",
        group: updatedGroup,
      });
    } catch (error) {
      console.error("Error updating group:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

module.exports = updateGroup;
