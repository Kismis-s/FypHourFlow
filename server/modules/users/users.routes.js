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
const createAchievement = require("../achievements/controllers/createAchievements");
const pushAchievement = require("../achievements/controllers/pushAchievement");
const createGroup = require("../groups/controllers/createGroup");
const updateGroup = require("../groups/controllers/updateGroups");
const delGroup = require("../groups/controllers/delGroup");
const getAllGroups = require("../groups/controllers/getAllGroups");
const getGroupById = require("../groups/controllers/getGroupbyId");
const joinGroup = require("../groups/controllers/joinGroup");
const leaveGroup = require("../groups/controllers/leaveGroup");
const createPost = require("../posts/controllers/createPost");
const updatePost = require("../posts/controllers/updatePost");
const getAllPosts = require("../posts/controllers/getAllPosts");
const getPostById = require("../posts/controllers/getPostbyId");
const deletePost = require("../posts/controllers/deletePost");
const createComment = require("../comments/controllers/createComment");
const updateComment = require("../comments/controllers/updateComment");
const getAllComment = require("../comments/controllers/getAllComments");
const getCommentById = require("../comments/controllers/getCommentbyId");
const deleteComment = require("../comments/controllers/deleteComment");
const multer = require('multer');
const upload = multer();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);

userRouter.post("/createAchievement", createAchievement);

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

//for achievements
userRouter.post("/pushAchievement", pushAchievement);

//for groups
userRouter.post("/createGroup", createGroup);
userRouter.get("/groups", getAllGroups);
userRouter.get("/getGroupbyId/:id", getGroupById);
userRouter.put("/joinGroup/:id", joinGroup);
userRouter.patch("/leaveGroup/:id", leaveGroup);
userRouter.patch("/updateGroup/:id", updateGroup);
userRouter.delete("/deleteGroup/:id", delGroup);

//for posts
userRouter.post("/createPost/:id", upload.none(), createPost);
userRouter.patch("/updatePost/:id", updatePost);
userRouter.get("/posts", getAllPosts);
userRouter.get("/getPostbyId/:id", getPostById);
userRouter.delete("/deletePost/:id", deletePost);

//for comments
userRouter.post("/createComment/:groupId/:postId", createComment);
userRouter.patch("/updateComment/:id", updateComment);
userRouter.get("/getCommentbyId/:id", getCommentById);
userRouter.get("/getAllComments", getAllComment);
userRouter.delete("/deleteComment/:id", deleteComment);

module.exports = userRouter;