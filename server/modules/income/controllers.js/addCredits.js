const mongoose = require("mongoose");

const addCredits = async (req,res)=>{
    const Users = mongoose.model("users");
    const Transactions = mongoose.model("transactions");

    const {amount, remarks} = req.body;

    try{
        if (!amount) throw "Please input amount!";
        if (!remarks) throw "Please input remarks!";
        if (remarks.length<3) throw "Remarks must be atleast 3 characters long!";
    }catch(e){
        res.status(400).json({
            status: "failed!",
            error: e
        })
        return;
    }
    try{
        await Transactions.create({
            amount: amount,
            remarks: remarks,
            user_id: req.user_id,
            transaction_type: "income"
        })
        await Users.updateOne({
            _id: req.user_id,
        },{
            $inc:{
                balance: amount,
            },
        },{
            runValidators: true,
        })
    }catch(e){
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