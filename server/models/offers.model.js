const mongoose = require("mongoose");

const offersSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,//id is object id
        ref: "users",//referencing to the model we are connecting
        required: [true, "ID is required!"]
    },
    sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users" 
    },
    receiver: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users",
        required: [true, "Receiver is required!"]
    },
    amount: {
        type: Number,
        required: [true, "Amount is required!"]
    },
    remarks: {
        type: String,
        required: [true, "Remarks is required!"],
    },
    transaction_type: {
        type: String,
        enum: ["income", "expense"],
        required: [true, "Type is required!"]
    },
},{
    timestamps: true,
})

const offersModel = mongoose.model("offers", offersSchema);

module.exports = offersModel;