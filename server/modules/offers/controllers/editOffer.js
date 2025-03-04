const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'offerImages/');
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
  { name: 'offerImages', maxCount: 1 },
]);

const editOffer = async (req, res) => {
  const Offers = mongoose.model('offers');
  const offerId = req.params.id; // Extract the service ID from the URL

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ status: 'Failed!', message: err });
    }

    const { title, description, credits, expiration } = req.body;
    const offerImages = req.files?.offerImages ? req.files.offerImages[0].filename : null;

    try {
      const offer =Offers.findById(offerId);

      if (!offer) {
        return res.status(404).json({ status: 'Failed!', message: 'offer not found!' });
      }

      const updateData = {
        title,
        description,
        credits,
        expiration
      };

      if (offerImages) {
        updateData.offerImages = offerImages;
      }

      const updateOffer = await Offers.updateOne(
        { _id: offerId },
        updateData
      );

      if (updateOffer.nModified === 0) {
        return res.status(400).json({
          status: 'Failed!',
          message: 'No changes made to the offer.',
        });
      }

      res.status(200).json({
        status: "Offer updated!",
        offerImages: offerImages ? `/offerImages/${offerImages}` : null,
      });
    } catch (e) {
      res.status(400).json({
        status: 'Failed!',
        error: e.message,
      });
    }
  });
};

module.exports = editOffer;
