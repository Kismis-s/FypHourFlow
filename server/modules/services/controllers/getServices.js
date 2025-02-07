const mongoose = require("mongoose");

const getServices = async (req, res) => {
  const Services = mongoose.model("services");
  const Users = mongoose.model("users");

  const userId = req.user._id; 
  try {
    const user = await Users.findById(userId);

    if (!user || !user.location || !user.location.coordinates) {
      return res.status(404).send({ error: "User's location not found" });
    }

    const userLocation = user.location.coordinates;  
    const maxDistance = parseInt(req.query.distance) || null;

    let allServices;

    if (maxDistance) {
      // If maxDistance is provided, filter by location within the specified distance
      allServices = await Services.find({
        location: {
          $nearSphere: {
            $geometry: {
              type: "Point",
              coordinates: userLocation,
            },
            $maxDistance: maxDistance,  // Max distance in meters
          },
        },
      });
    } else {
      // If no maxDistance is provided (All option), get all services
      allServices = await Services.find({});
    }

    res.status(200).send({ data: allServices });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).send({ error: "Server error" });
  }
};

module.exports = getServices;
