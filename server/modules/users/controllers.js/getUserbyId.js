const mongoose = require("mongoose");

const getUserbyId = async(req,res)=>{
    const Users = mongoose.model("users");

  try {
    const userId = req.params.id; 

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ error: "Invalid user ID format" });
    }

    // Find user by ID
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Send the user data
    res.status(200).send({ data: user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send({ error: "Server error" });
  }
}

module.exports = getUserbyId;
