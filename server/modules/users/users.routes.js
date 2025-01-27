const express = require("express");
const userRouter = express.Router();
const userRegister = require("./controllers.js/userRegister");
const userLogin = require("./controllers.js/userLogin");
const userDashboard = require("./controllers.js/userDashboard");
const auth=require("../../middlewares/auth");
const sendCredits = require("./controllers.js/sendCredits");
const editProfile = require("./controllers.js/editProfile");
const postRequest = require("../../modules/services/controllers/postRequest");
const getServices = require("../services/controllers/getServices");
const getUserbyId = require("./controllers.js/getUserbyId");


userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);

userRouter.use(auth);
userRouter.patch("/editProfile", editProfile);
userRouter.get("/dashboard", userDashboard);
userRouter.post("/sendCredits",sendCredits);//time banking
//for services
userRouter.post("/postRequest", postRequest);
userRouter.get("/getServices", getServices);
userRouter.get("/getUserById/:id", getUserbyId);

module.exports = userRouter;