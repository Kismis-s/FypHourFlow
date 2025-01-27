const mongoose = require("mongoose");
 const Services = require("../../../models/services.model");

const postRequest = async (req, res) => {

  const Users = mongoose.model("users");
  //const Services = mongoose.model("services");
  const {
    title,
    description,
    photo,
    skills,
    credits,
    timeline,
    expiration,
    status
  } = req.body;
  try {

    const newRequest = await Services.create({
        user_id: req.user._id, 
        client: req.user._id,
        title,
        description,
        photo,
        skills,
        credits,
        timeline,
        expiration,
        status
    });
    console.log(newRequest);

    await Users.updateOne(
      { _id: req.user._id },
      {
        $push: { openServices: newRequest._id },
      }
    );
    res.status(201).json({
      status: "Sucessful!",
      message: "Job created successfully!!",
      data: newRequest,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: error.message || error,
    });
  }
};
module.exports = postRequest;