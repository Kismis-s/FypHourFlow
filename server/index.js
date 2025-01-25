const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const userRouter = require("./modules/users/users.routes");
require("./models/transactions.model");
require("./models/users.model"); // Ensure the user model is correctly defined
const authRouter = require("./modules/users/authRoutes");
require("./middlewares/auth");
require("dotenv").config();
require("./middlewares/passport");
const path = require("path");

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Session setup
app.use(
    session({
        secret: process.env.SESSION_SECRET, // Use env variable for security
        resave: false,
        saveUninitialized: true,
    })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Serialize and deserialize user for session support
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_CONNECT)
    .then(() => {
        console.log("Mongoose connected successfully!!");
    })
    .catch((e) => {
        console.error("Mongoose connection failed!!", e);
    });

// User Routes
app.use("/user", userRouter);
// app.use("/users", authRouter); 

// Start the server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
