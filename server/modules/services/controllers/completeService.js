const mongoose = require('mongoose');

const completeService = async (req, res) => {
  const Services = mongoose.model('services');
  try {
      const { id } = req.params; // Service ID
      const userId = req.user._id; // Logged-in user (client)

      const service = await Services.findById(id);
      if (!service) {
          return res.status(404).json({ message: "Service not found!" });
      }

      // Ensure only the client can mark it as completed
      if (service.client?.toString() !== userId) {
          return res.status(403).json({ message: "Unauthorized! Only the client can mark the service as completed." });
      }

      // Update service status to "Completed"
      service.status = "Completed";
      await service.save();

      // Move the service from ongoing to completed in user's document
      await userModel.findByIdAndUpdate(userId, {
          $pull: { ongoingServices: id },
          $push: { completedServices: id },
      });

      res.status(200).json({ message: "Service marked as completed!"});

  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


module.exports = completeService;
