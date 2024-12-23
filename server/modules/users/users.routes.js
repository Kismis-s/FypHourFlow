const express = require("express");
const userRouter = express.Router();
const userRegister = require("./controllers.js/userRegister");
const userLogin = require("./controllers.js/userLogin");
const userDashboard = require("./controllers.js/userDashboard");
const auth = require("../../middlewares/auth");
const editProfile = require("./controllers.js/editProfile");

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/editProfile", auth, editProfile);
userRouter.get("/dashboard", auth, userDashboard);

module.exports = userRouter;