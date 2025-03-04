const mongoose = require("mongoose");
const Offers = require("../../../models/offers.model");
const Users = require("../../../models/users.model");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "offerImages/");
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
}).fields([{ name: "offerImages", maxCount: 1 }]);

const createOffer = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ status: "Failed!", message: err });
    }

    const { title, description, credits, expiration } = req.body;
    const offerImages = req.files?.offerImages ? req.files.offerImages[0].filename : null;

    const session = await mongoose.startSession(); // Start session for transaction

    try {
      session.startTransaction(); // Begin transaction

      const newOffer = await Offers.create(
        [
          {
            offerProvider: req.user._id, // Logged in user's ID
            title,
            description,
            offerImages,
            credits,
            expiration,
          },
        ],
        { session } // Pass session to the offer creation
      );

      // Update user's created offers
      await Users.updateOne(
        { _id: req.user._id },
        { $push: { createdOffers: newOffer[0]._id } },
        { session } 
      );

      // Commit transaction if everything is successful
      await session.commitTransaction();
      session.endSession();

      res.status(201).json({
        status: "Offer created successfully!",
        data: newOffer[0], // Return the created offer
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

module.exports = createOffer;
