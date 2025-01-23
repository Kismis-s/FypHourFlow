const mongoose = require("mongoose");

const subtractCredits = async (req,res)=>{
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
            user_id: req.user._id,
            transaction_type: "expense"
        })
        await Users.updateOne({
            _id: req.user._id,
        },{
            $inc:{
                balance: -amount,
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
        status: "Credits sent sucessfully!"
    })
}

module.exports = subtractCredits;