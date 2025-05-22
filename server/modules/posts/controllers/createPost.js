const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "postImages/");
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
}).fields([{ name: "postImages", maxCount: 1 }]);

const createPost = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ status: "Failed!", message: err });
    }
  const PostModel = mongoose.model("posts");
  const GroupModel = mongoose.model("groups");
  const UserModel = mongoose.model("users");
  try {
    const groupId = req.params.id;
    const { content } = req.body;
    const postImages = req.files?.postImages ? req.files.postImages[0].filename : null;

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
      postImages,
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

    const commentCount = await PostModel.aggregate([
      { $match: { _id: newPost._id } },
      { $unwind: "$comments" },
      { $count: "totalComments" },
    ]);

    res.status(201).json({
      status: "Post created successfully",
      post: newPost,
      commentCount: commentCount.length ? commentCount[0].totalComments : 0,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})
};

module.exports = createPost;