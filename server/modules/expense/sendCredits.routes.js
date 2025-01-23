const express = require("express");
const auth = require("../../middlewares/auth");
const subtractCredits = require("./sendCredits");

const subtractRouter = express.Router();

subtractRouter.use(auth);
subtractRouter.post("/subtract", subtractCredits);

module.exports = subtractRouter;