const mongoose = require("mongoose");
const Users = mongoose.model("users");

// Function to check and push achievements
const pushAchievement = async (userId) => {
  try {
    const Achievements = mongoose.model("achievements");

    // Find user
    const user = await Users.findById(userId);
    if (!user) return;

    // Find eligible achievements
    const eligibleAchievements = await Achievements.find({ 
      requiredTimeCredits: { $lte: user.balance } // Checking balance
    });

    // Update user's achievement badges
    await Users.findByIdAndUpdate(userId, {
      $addToSet: { achievementBadges: { $each: eligibleAchievements.map(a => a._id) } }
    });

    console.log(`Achievements updated for user: ${userId}`);
  } catch (error) {
    console.error("Error updating achievements:", error);
  }
};

// Watch for balance updates and call pushAchievement
Users.watch([{ $match: { "updateDescription.updatedFields.balance": { $exists: true } } }])
  .on("change", async (change) => {
    const userId = change.documentKey._id;
    console.log(`Balance updated for user: ${userId}`);

    // Call pushAchievement function when balance updates
    await pushAchievement(userId);
  });

module.exports = pushAchievement;
