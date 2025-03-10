const mongoose = require("mongoose");

const acceptRequest = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const serviceId = req.params.id;
    const userId = req.user._id;
    const Services = mongoose.model("services");
    const Users = mongoose.model("users");

    const service = await Services.findById(serviceId).session(session);
    if (!service) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).send({ message: "Service not found" });
    }

    const client = await Users.findById(service.client).session(session);
    if (!client) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Client not found!" });
    }

    const user = await Users.findById(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "User not found!" });
    }

    if (service.status !== "Open") {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Service is not available for acceptance" });
    }

    service.status = "In Progress";
    service.provider = userId;
    await service.save({ session });

    // Add to provider's ongoingServices if not already present
    if (!user.ongoingServices.includes(serviceId)) {
      user.ongoingServices.push(serviceId);
      await user.save({ session });
    }

    // Remove from client's openServices and add to ongoingServices
    await Users.findByIdAndUpdate(client._id, {
      $pull: { openServices: serviceId },
      $push: { ongoingServices: serviceId },
    }, { session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(200).send({
      status: "Service accepted successfully!",
      data: service,
      clientInfo: client,
      userInfo: user,
    });
  } catch (error) {
    console.error("Error accepting the service:", error);
    await session.abortTransaction();
    session.endSession();
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = acceptRequest;
