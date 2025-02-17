const mongoose = require('mongoose');

const deleteService = async (req, res) => {
  const Services = mongoose.model('services');
  const serviceId = req.params.id;

  try {
    const service = await Services.findById(serviceId);

    if (!service) {
      return res.status(404).json({ status: 'Failed!', message: 'Service not found!' });
    }

    if (service.status !== 'Open') {
      return res.status(403).json({ status: 'Failed!', message: 'Service is not open for deleting.' });
    }
    await Services.deleteOne({ _id: serviceId });

    res.status(200).json({
      status: 'Service deleted!',
    });
  } catch (e) {
    res.status(400).json({
      status: 'Failed!',
      error: e.message,
    });
  }
};

module.exports = deleteService;
