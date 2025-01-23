const addCredits = require("./controllers.js/addCredits");
const express = require("express");
const auth = require("../../middlewares/auth");

const addRouter = express.Router();

addRouter.use(auth);
addRouter.post("/add", addCredits);

module.exports = addRouter;