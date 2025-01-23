const mongoose = require("mongoose");
const Users = require("../../../models/users.model");
const Transactions = require("../../../models/transactions.model");

const addCredits = async (req,res)=>{
    // const Users = mongoose.model("users");
    
    
    // const Transactions = mongoose.model("transactions");

    const {amount, remarks} = req.body;

    try{
        if (!amount) throw "Please input amount!";
        if (!remarks) throw "Please input remarks!";
        if (remarks.length<3) throw "Remarks must be atleast 3 characters long!";
        console.log("Validation passed:", { amount, remarks });

    }catch(e){
        console.error("Validation error:", e);
        res.status(400).json({
            status: "failed!",
            error: e
        })
        return;
    }
    try{
        console.log("Attempting to create transaction...");
        await Transactions.create({
            amount: amount,
            remarks: remarks,
            user_id: req.user._id,
            transaction_type: "income"
        })
        console.log("Transaction created successfully!");
        console.log("Updating user balance...");
        await Users.updateOne({
            _id: req.user._id,
        },{
            $inc:{
                balance: amount,
            },
        },{
            runValidators: true,
        })
        console.log("User balance updated successfully!");
    }catch(e){
        console.error("Database operation error:", e);
        res.status(400).json({
            status: "failed!",
            error: e
        })
        return;
    }
    res.status(200).json({
        status: "Credits added sucessfully!"
    })
}

module.exports = addCredits;