const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const Users = mongoose.model("users"); // Import the Mongoose model
const jwt=require("jsonwebtoken")
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/users/auth/google/callback', // Adjust callback URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists in the database
        const existingUser = await Users.findOne({ email: profile.emails[0].value });
        if (existingUser) {
          return done(null, existingUser); // User found, return it
        }

        // If user is not found, create a new user
        const newUser = new Users({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: null, // No password for Google-authenticated users
          provider: "google", // Set provider to 'google'
          googleId: profile.id, // Store Google-specific ID
        });
        const savedUser = await newUser.save(); // Save the new user in the database
        return done(null, savedUser);
      } catch (error) {
        console.error('Error during user authentication:', error);
        return done(error, null);
      }
    }
  )
);

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user._id); // Save the user ID in the session
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findById(id);
    if (user) {
      done(null, user); // Pass the user object to the request
    } else {
      done(new Error('User not found'));
    }
  } catch (error) {
    console.error('Error deserializing user:', error);
    done(error, null);
  }
});

// Export passport for use in the app
module.exports = passport;
