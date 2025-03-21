const mongoose = require("mongoose");

const sendCredits = async (req, res) => {
    const Users = mongoose.model("users");
    const Transactions = mongoose.model("transactions");

    const { amount, remarks, receiverEmail } = req.body;

    try {
        // Validatations...
        if (!amount) throw "Please input amount!";
        if (!remarks) throw "Please input remarks!";
        if (!receiverEmail) throw "Please input the receiver!";
        if (remarks.length < 3) throw "Remarks must be at least 3 characters long!";
        
        const sender = req.user; 
        if (!sender) throw "Sender not found!"; 

        // Finding the receiver by email
        const receiver = await Users.findOne({ email: receiverEmail });
        if (!receiver) throw "Receiver not found!";

        if (sender.balance < amount) throw "Insufficient balance!";

        // Creating the transaction for the sender 
        await Transactions.create({
            sender: sender._id,
            receiver: receiver._id,
            amount: amount,
            remarks: remarks,
            transaction_type: "expense",
            user_id: sender._id,  
        });

        // Creating the transaction for the receiver 
        await Transactions.create({
            sender: sender._id,
            receiver: receiver._id,
            amount: amount,
            remarks: remarks,
            transaction_type: "income",  // Receiver is gaining credits
            user_id: receiver._id,
        });

        // Subtract amount from sender's balance
        await Users.updateOne(
            { _id: sender._id },
            { $inc: { balance: -amount } },
            { runValidators: true }
        );

        // Add amount to receiver's balance
        await Users.updateOne(
            { _id: receiver._id },
            { $inc: { balance: amount } },
            { runValidators: true }
        );

        res.status(200).json({
            status: "Credits sent successfully!",
        });
    } catch (e) {
        res.status(400).json({
            status: "failed!",
            error: e,
        });
    }
};

module.exports = sendCredits; 