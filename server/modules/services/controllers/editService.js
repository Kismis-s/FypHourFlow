const mongoose = require('mongoose');
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

const editService = async (req, res) => {
  const Services = mongoose.model('services');
  const serviceId = req.params.id; // Extract the service ID from the URL

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ status: 'Failed!', message: err });
    }

    const { title, description, skills, credits, timeline, expiration } = req.body;
    const serviceImage = req.files?.serviceImage ? req.files.serviceImage[0].filename : null;

    try {
      const service = await Services.findById(serviceId);

      if (!service) {
        return res.status(404).json({ status: 'Failed!', message: 'Service not found!' });
      }

      // Check if the service status is "Open"
      if (service.status !== 'Open') {
        return res.status(403).json({ status: 'Failed!', message: 'Service is not open for editing.' });
      }

      const updateData = {
        title,
        description,
        skills: Array.isArray(skills) ? skills : skills?.split(',').map(skill => skill.trim()), // Convert skills to array
        credits,
        timeline,
        expiration
      };

      if (serviceImage) {
        updateData.serviceImage = serviceImage;
      }

      const updateService = await Services.updateOne(
        { _id: serviceId },
        updateData
      );

      if (updateService.nModified === 0) {
        return res.status(400).json({
          status: 'Failed!',
          message: 'No changes made to the service.',
        });
      }

      res.status(200).json({
        status: "Service updated!",
        serviceImage: serviceImage ? `/serviceImages/${serviceImage}` : null,
      });
    } catch (e) {
      res.status(400).json({
        status: 'Failed!',
        error: e.message,
      });
    }
  });
};

module.exports = editService;
