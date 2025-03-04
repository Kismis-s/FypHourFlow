const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const userRouter = require("./modules/users/users.routes");
const http=require("http")
const { Server } = require("socket.io");
require("./models/transactions.model");
require("./models/users.model"); // Ensure the user model is correctly defined
//const authRouter = require("./modules/users/authRoutes");
require("./middlewares/auth");
require("./models/review.model")
require("./models/messages.model");
require("dotenv").config();
require("./middlewares/passport");
const path = require("path");

const app = express();
const server=http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    },
  });
// Middleware to parse JSON
app.use(express.json());
app.use(cors("*"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/serviceImages", express.static(path.join(__dirname, "serviceImages")));
app.use("/offerImages", express.static(path.join(__dirname, "offerImages")));

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

// WebSocket Logic
io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);
  
    // Handle room creation or joining
    socket.on("start_chat", async (data) => {
      const { userId1, userId2 } = data;
      const MessageModel = mongoose.model("Message");
      const UserModel = mongoose.model("users");
      // Generate a unique room ID based on user IDs
      const roomId = [userId1, userId2].sort().join("_"); // Ensures consistent room ID order
      socket.join(roomId);
  
      console.log(`User ${socket.id} joined room: ${roomId}`);
  
      // Notify other users in the room (optional)
      socket.to(roomId).emit("user_joined", { userId: userId1 });
      // Load past messages from database for this room
      try {
        const pastMessages = await MessageModel.find({ roomId }).sort({
          timestamp: 1,
        });
        socket.emit("past_messages", pastMessages);
      } catch (error) {
        console.error("Error fetching past messages:", error);
      }
    });
  
    // Handle sending messages
    socket.on("send_message", async (data) => {
      const { roomId, message, senderId } = data;
      const MessageModel = mongoose.model("Message");
      try {
        // Save message to DB
        const newMessage = await MessageModel.create({
          roomId,
          senderId,
          message,
        });
  
        io.to(roomId).emit("receive_message", {
          senderId,
          message,
          messageId: newMessage._id,
        });
        console.log(`Message saved to db and sent to room ${roomId}: ${message}`);
      } catch (error) {
        console.error("Error saving message to database:", error);
        // consider informing user that the message was not saved.
      }
    });
    
    // Handle client disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

// Start the server
server.listen(3059, () => {
    console.log("Server started on port 3059");
});
