const mongoose = require("mongoose");
const Services = require("../../../models/services.model");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'serviceImages/');
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
      cb('Error: Images only!');
    }
  },
}).fields([
  { name: 'serviceImage', maxCount: 1 },
]);

const postRequest = async (req, res) => {

  const Users = mongoose.model("users");
  //const Services = mongoose.model("services");

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ status: 'Failed!', message: err });
    }

  const {
    title,
    description,
    skills,
    credits,
    timeline,
    expiration,
    status
  } = req.body;
  const serviceImage = req.files?.serviceImage ? req.files.serviceImage[0].filename : null;
  try {

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
        status
    });

    await Users.updateOne(
      { _id: req.user._id },
      {
        $push: { openServices: newRequest._id },
      }
    );
    res.status(201).json({
      status: "Sucessful!",
      message: "Job created successfully!!",
      data: newRequest,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: error.message || error,
    });
  }
})
};
module.exports = postRequest;