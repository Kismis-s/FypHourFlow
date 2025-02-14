const mongoose = require("mongoose");

const acceptRequest = async (req, res) => {
  const serviceId = req.params.id;
  const userId = req.user._id;
  const Services = mongoose.model("services");
  const Users = mongoose.model("users");

  try {
    const service = await Services.findById(serviceId);

    if (!service) {
      return res.status(404).send({ message: "Service not found" });
    }

    const client = await Users.findById(service.client);
    if (!client) {
      return res.status(404).json({ message: "Client not found!" });
    }


    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (service.status !== "Open") {
      return res.status(400).json({ message: "Service is not available for acceptance" });
    }

    service.status = "In Progress";
    service.provider = userId;
    await service.save();

    if (!user.ongoingServices.includes(serviceId)) {
      user.ongoingServices.push(serviceId);
      await user.save();
    }

    client.openServices = client.openServices.filter(id => id.toString() !== serviceId);
    if (!client.ongoingServices.includes(serviceId)) {
      client.ongoingServices.push(serviceId);
    }
    await client.save();

    res.status(200).send({ 
      status: "Service accepted successfully!",
      data: service,
      clientInfo: client,
    userInfo: user });
  } catch (error) {
    console.error("Error accepting the service:", error);
    res.status(500).send({ message: "Internal server error" });
    return;
  }
};

module.exports = acceptRequest;