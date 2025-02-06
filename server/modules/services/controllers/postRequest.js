const mongoose = require("mongoose");
const Services = require("../../../models/services.model");
const Users = require("../../../models/users.model");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "serviceImages/");
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
}).fields([{ name: "serviceImage", maxCount: 1 }]);

const postRequest = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ status: "Failed!", message: err });
    }

    const { title, description, skills, credits, timeline, expiration, status } = req.body;
    const serviceImage = req.files?.serviceImage ? req.files.serviceImage[0].filename : null;

    try {
      // 🔹 Fetch the user's location from the Users model
      const user = await Users.findById(req.user._id);
      if (!user || !user.location || !user.location.coordinates) {
        return res.status(400).json({
          status: "Error",
          message: "User's location is not available.",
        });
      }

      // 🔹 Store the user's current location when the service is created (store it as part of the service)
      const newRequest = await Services.create({
        user_id: req.user._id,
        client: req.user._id,
        title,
        description,
        serviceImage,
        skills,
        credits,
        timeline,
        expiration,
        status,
        location: {
          type: "Point",
          coordinates: [user.location.coordinates[0], user.location.coordinates[1]], // Corrected to access the right coordinates
        },
      });

      // 🔹 Add service to user's openServices list
      await Users.updateOne(
        { _id: req.user._id },
        { $push: { openServices: newRequest._id } }
      );

      res.status(201).json({
        status: "Successful!",
        message: "Job created successfully!",
        data: newRequest,
      });
    } catch (error) {
      res.status(400).json({
        status: "Error",
        message: error.message || error,
      });
    }
  });
};

module.exports = postRequest;
