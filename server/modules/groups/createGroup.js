const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const Users = require("../../models/users.model");
const Groups = require("../../models/groups.model");

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

const createGroup = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ status: "Failed!", message: err });
    }

    const { name, description, skills, creator} = req.body;
    const groupImages = req.files?.groupImages ? req.files.groupImages[0].filename : null;

    let parsedSkills = [];
    try {
      parsedSkills = typeof skills === "string" ? JSON.parse(skills) : skills;
    } catch (parseError) {
      return res.status(400).json({
        status: "Failed!",
        message: "Skills must be a valid JSON array",
      });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const newGroup = await Groups.create(
        [
          {
            name, 
            description, 
            skills: parsedSkills, 
            creator: req.user._id,
            image: groupImages,
            members: [req.user._id],
          },
        ],
        { session }
      );

      await Users.updateOne(
        { _id: req.user._id },
        { $push: { groups: newGroup[0]._id } },
        { session }
      );

      // Commit the transaction if everything is successful
      await session.commitTransaction();
      session.endSession();

      res.status(201).json({
        status: "Successfully created a group!",
        data: newGroup,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(400).json({
        status: "Error",
        message: error.message || error,
      });
    }
  });
};

module.exports = createGroup;
