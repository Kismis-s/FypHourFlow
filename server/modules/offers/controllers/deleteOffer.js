const mongoose = require('mongoose');

const deleteOffer = async (req, res) => {
  const Offers = mongoose.model('offers');
  const {id} = req.params;
  console.log("Received delete request for ID:", id);

  if (!id) {
    return res.status(404).json({ status: 'Failed!', message: 'Offer not found!' });
  }

  try {

    const deletedOffer = await Offers.findByIdAndDelete(id);
    if (!deletedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    res.status(200).json({
      status: 'Offer deleted!',
    });
  } catch (e) {
    res.status(400).json({
      status: 'Failed!',
      error: e.message,
    });
  }
};

module.exports = deleteOffer;
