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
const createOffer = require("../offers/controllers/createOffer");
const getOffers = require("../offers/controllers/getOffers");
const claimOffer = require("../offers/controllers/claimOffer");
const editOffer = require("../offers/controllers/editOffer");
const getReviewById = require("../review/controller/getReviewById");
const createReview = require("../review/controller/createReview");
const deleteOffer = require("../offers/controllers/deleteOffer");

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);

userRouter.use(auth);
userRouter.patch("/editProfile", editProfile);
userRouter.get("/dashboard", userDashboard);
userRouter.get("/getUser/:userId",getUserByID);
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
//for offers
userRouter.post("/createOffer", createOffer);
userRouter.get("/getOffers", getOffers);
userRouter.post("/claimOffer/:id", claimOffer);
userRouter.patch("/editOffer/:id", editOffer);
userRouter.delete("/deleteOffer/:id", deleteOffer);

//for review
userRouter.get("/getReview/:id",getReviewById);
userRouter.post("/createReview",createReview);

module.exports = userRouter;