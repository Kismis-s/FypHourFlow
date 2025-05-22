const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
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
  { name: 'photo', maxCount: 1 },
  { name: 'cover', maxCount: 1 },
]);

const editProfile = async (req, res) => {
  const Users = mongoose.model('users');

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ status: 'Failed!', message: err });
    }

    const { name, email, birthday, phone, city, country, profession, skills } = req.body;
    const photo = req.files?.photo ? req.files.photo[0].filename : null;
    const cover = req.files?.cover ? req.files.cover[0].filename : null;

    try {
      const updateData = {
        name,
        email,
        birthday,
        phone,
        city,
        country,
        profession,
        skills,
      };

      if (photo) {
        updateData.photo = photo;
      }

      if (cover) {
        updateData.cover = cover;
      }

      const updateProfile = await Users.updateOne(
        { _id: req.user._id },
        updateData
      );

      if (updateProfile.nModified === 0) {
        return res.status(400).json({
          status: 'Failed!',
          message: 'No changes made to the profile.',
        });
      }

      res.status(200).json({
        status: "Profile updated!",
        photo: photo ? `/uploads/${photo}` : null,
        cover: cover ? `/uploads/${cover}` : null,
      });
    } catch (e) {
      res.status(400).json({
        status: 'Failed!',
        error: e.message,
      });
    }
  });
};

module.exports = editProfile;
