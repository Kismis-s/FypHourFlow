const mongoose = require("mongoose");

const getUserByID = async (req, res) => {
  const Users = mongoose.model("users");
  const {id} = req.params;


  try {
    const getUser = await Users.findOne({ _id: id });

    if (!getUser) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send({ data: getUser });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).send({ error: "Server error" });
  }
};

module.exports = getUserByID;
