const mongoose = require("mongoose");

const offersSchema = new mongoose.Schema({
    offerProvider: {
        type: mongoose.Schema.Types.ObjectId,//id is object id
        ref: "users",//referencing to the model we are connecting
        required: [true, "ID is required!"]
    },
    offerReceivers: [ // Array of users who can receive the offer
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],
    credits: {
        type: Number,
        required: [true, "Credits is required!"]
    },
    title: {
        type: String,
        required: [true, "Title is required!"],
    },
    description: {
        type: String,
        required: [true, "Description is required!"],
    },
    offerImages: {
        type: String,
    },
    expiration: {
        type: String,
        required: [true, "Expiration date is required!"],
    },
},{
    timestamps: true,
})

const offersModel = mongoose.model("offers", offersSchema);

module.exports = offersModel;