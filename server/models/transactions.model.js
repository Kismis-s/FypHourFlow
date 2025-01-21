const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,//id is object id
        ref: "users",//referencing to the model we are connecting
        required: [true, "ID is required!"]
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

const transactionModel = mongoose.model("transactions", transactionSchema);

module.exports = transactionModel;