const mongoose = require("mongoose");

const getServices = async (req, res) => {
  const Services = mongoose.model("services");
  const Users = mongoose.model("users");

  const userId = req.user._id;
  const { distance, status } = req.query; 

  try {
    const user = await Users.findById(userId);

    if (!user || !user.location || !user.location.coordinates) {
      return res.status(404).send({ error: "User's location not found" });
    }

    const userLocation = user.location.coordinates;
    const maxDistance = distance ? parseInt(distance) : null;

    let filter = {}; // Initialize an empty filter object

    if (maxDistance) {
      filter.location = {
        $nearSphere: {
          $geometry: { type: "Point", coordinates: userLocation },
          $maxDistance: maxDistance, // Max distance in meters
        },
      };
    }

    if (status && status !== "all") {
      filter.status = status; // Add status filtering if it's not "all"
    }

    const allServices = await Services.find(filter).populate("provider");

    res.status(200).send({ data: allServices });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).send({ error: "Server error" });
  }
};

module.exports = getServices;
