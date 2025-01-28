const mongoose = require("mongoose");

const findServicebyId = async (req, res) => {
  const id = req.params.id;
  const Services = mongoose.model("services");
  const Users = mongoose.model("users");

  try {
    const service = await Services.findById(id);

    if (!service) {
      return res.status(404).send({ message: "Service not found" });
    }

    res.status(200).send({ data: service });
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = findServicebyId;