const mongoose = require("mongoose");
const Achievements = require("../../../models/achievements.model");
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
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images only!");
    }
  },
}).fields([{ name: "achievementImages", maxCount: 1 }]);

const createAchievement = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ status: "Failed!", message: err });
    }

    const { name, description, requiredTimeCredits } = req.body;
    const achievementImages = req.files?.achievementImages ? req.files.achievementImages[0].filename : null;

    const session = await mongoose.startSession(); // Start session for transaction

    try {
      session.startTransaction(); // Begin transaction

      const newAchievement = await Achievements.create(
        [
          {
            name,
            description,
            achievementImages,
            requiredTimeCredits
          },
        ],
        { session } // Pass session to the offer creation
      );

      // Commit transaction if everything is successful
      await session.commitTransaction();
      session.endSession();

      res.status(201).json({
        status: "Achievement created successfully!",
        data: newAchievement[0], // Return the created offer
      });
    } catch (error) {
      // Abort transaction if there is an error
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
