const express = require("express");
const userRouter = express.Router();
const userRegister = require("./controllers.js/userRegister");
const userLogin = require("./controllers.js/userLogin");
const userDashboard = require("./controllers.js/userDashboard");
const auth=require("../../middlewares/auth");
const sendCredits = require("./controllers.js/sendCredits");
const editProfile = require("./controllers.js/editProfile");
const postRequest = require("./controllers.js/postRequest");


userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);

userRouter.use(auth);
userRouter.patch("/editProfile", editProfile);
userRouter.get("/dashboard", userDashboard);
userRouter.post("/sendCredits",sendCredits);
userRouter.post("/postRequest",postRequest);

module.exports = userRouter;