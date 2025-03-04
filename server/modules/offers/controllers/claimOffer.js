const mongoose = require("mongoose");

const claimOffer = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const offerId = req.params.id;
    const userId = req.user._id;
    const Offers = mongoose.model("offers");
    const Users = mongoose.model("users");

    const offer = await Offers.findById(offerId).session(session);
    if (!offer) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).send({ message: "offer not found" });
    }

    const offerProvider = await Users.findById(offer.offerProvider).session(session);
    if (!offerProvider) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Client not found!" });
    }

    const user = await Users.findById(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "User not found!" });
    }

    if (offer.credits <= user.credits) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "The credits do not meet the offer's credit requirements!" });
    }

    offer.offerReceivers = userId;
    await offer.save({ session });

    // Add to provider's ongoingServices if not already present
    if (!user.claimedOffers.includes(offerId)) {
      user.claimedOffers.push(offerId);
      await user.save({ session });
    }

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(200).send({
      status: "Offer claimed successfully!",
      data: offer,
      userInfo: user,
    });
  } catch (error) {
    console.error("Error claiming the offer:", error);
    await session.abortTransaction();
    session.endSession();
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = claimOffer;
