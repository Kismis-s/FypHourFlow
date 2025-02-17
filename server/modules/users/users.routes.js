const express = require("express");
const userRouter = express.Router();
const userRegister = require("./controllers/userRegister");
const userLogin = require("./controllers/userLogin");
const userDashboard = require("./controllers/userDashboard");
const auth=require("../../middlewares/auth");
const sendCredits = require("./controllers/sendCredits");
const editProfile = require("./controllers/editProfile");
const postRequest = require("../../modules/services/controllers/postRequest");
const getServices = require("../services/controllers/getServices");;
const findServicebyId = require("../services/controllers/findServicebyId");
const getUserByID = require("../users/controllers/getUserbyId");
const acceptRequest = require("../services/controllers/acceptRequest");
const editService = require("../services/controllers/editService");
const deleteService = require("../services/controllers/deleteService");
const completeService = require("../services/controllers/completeService");

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);

userRouter.use(auth);
userRouter.patch("/editProfile", editProfile);
userRouter.get("/dashboard", userDashboard);
userRouter.post("/sendCredits",sendCredits);//time banking
//for services
userRouter.post("/postRequest", postRequest);
userRouter.get("/getServices", getServices);
userRouter.get("/getUser/:id", getUserByID);
userRouter.get("/findServicebyId/:id", findServicebyId);
userRouter.post("/acceptRequest/:id", acceptRequest);
userRouter.patch("/editService/:id", editService);
userRouter.delete("/deleteService/:id", deleteService);
userRouter.post("/completeService/:id", completeService);

module.exports = userRouter;