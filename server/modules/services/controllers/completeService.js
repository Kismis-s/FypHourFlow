const mongoose = require('mongoose');

const completeService = async (req, res) => {
  const Services = mongoose.model("services");
  const Users = mongoose.model("users");

  try {
      const { id } = req.params; // Service ID
      const userId = req.user._id; // Logged-in user

      // Find the service
      const service = await Services.findById(id);
      if (!service) {
          return res.status(404).json({ message: "Service not found!" });
      }

      // Check if the user is the client of this service
      if (service.client.toString() !== userId.toString()) {
          return res.status(403).json({
              message: "Unauthorized! Only the client can mark the service as completed."
          });
      }

      // Ensure the service is in progress before completing
      if (service.status !== "In Progress") {
          return res.status(400).json({ message: "Service must be in progress to be completed!" });
      }

      // Mark the service as completed
      service.status = "Completed";
      await service.save();

      // Move the service from ongoing to completed in the user's document
      await Users.findByIdAndUpdate(userId, {
          $pull: { ongoingServices: id },
          $push: { completedServices: id },
      });

      await Users.findByIdAndUpdate(service.provider, {
        $pull: { ongoingServices: id },
        $push: { completedServices: id },
    });

      res.status(200).json({ message: "Service marked as completed!" });

  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};



module.exports = completeService;
