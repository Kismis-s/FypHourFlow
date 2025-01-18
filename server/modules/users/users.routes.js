const express = require("express");
const userRouter = express.Router();
const userRegister = require("./controllers.js/userRegister");
const userLogin = require("./controllers.js/userLogin");
const userDashboard = require("./controllers.js/userDashboard");
const auth = require("../../middlewares/auth");
const editProfile = require("./controllers.js/editProfile");
const addRouter = require("../income/addCredits.routes");
const subtractRouter = require("../expense/subtractCredits.routes");

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);

userRouter.use(auth);
userRouter.post("/editProfile", editProfile);
userRouter.get("/dashboard", userDashboard);

module.exports = userRouter;