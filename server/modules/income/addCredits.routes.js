const addCredits = require("./controllers.js/addCredits");
const express = require("express");
const auth = require("../../middlewares/auth");

const addRouter = express.Router();

addRouter.post("/add", addCredits);

module.exports = addRouter;