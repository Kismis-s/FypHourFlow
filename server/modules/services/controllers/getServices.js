const mongoose = require("mongoose");

const getServices = async (req, res) => {
    console.log("here")
  const Services = mongoose.model("services");

  const allServices = await Services.find();

  res.status(200).send({ data: allServices });
};
module.exports = getServices;