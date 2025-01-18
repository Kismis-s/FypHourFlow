const express = require("express");
const auth = require("../../middlewares/auth");
const subtractCredits = require("./subtractCredits");

const subtractRouter = express.Router();

subtractRouter.use(auth);
subtractRouter.post("/subtract", subtractCredits);

module.exports = subtractRouter;