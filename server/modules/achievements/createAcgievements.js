const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "achievementImages/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|json}/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images only!");
    }
  },
}).fields([{ name: "achievementImage", maxCount: 1 }]);

const createAchievement = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ status: "Failed!", message: err });
    }

    console.log("Uploaded files:", req.files);
    
    const { name, description } = req.body;
    const achievementImage = req.files?.achievementImage ? req.files.achievementImage[0].filename : null;

    const session = await mongoose.startSession();
    session.startTransaction();

    const Achievements = mongoose.model("achievements");

    try {
      const newAchievement = await Achievements.create(
        [
          {
            name,
            description,
            achievementImage,
          },
        ],
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      res.status(201).json({
        status: "Successful!",
        message: "Achievement created successfully!",
        data: newAchievement,
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

module.exports = createAchievement;
