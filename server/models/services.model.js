const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,//id is object id
        ref: "users",//referencing to the model we are connecting
        required: [true, "ID is required!"]
    },
    client: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users" 
    },
    provider: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users",
        default: null,
    },
    title: {
        type: String,
        required: [true, "Title is required!"]
    },
    description: {
        type: String,
        required: [true, "Description is required!"],
    },
    serviceImage: {
        type: String,
        default: null
    },
    skills: {
        type: [String],
        required: [true, "Skills is required!"],
    },
    credits: {
        type: Number,
        required: [true, "Time credits is required!"],
    },
    timeline: {
        type: String,
        required: [true, "Timeline is required!"],
    },
    expiration: {
        type: String,
        required: [true, "Expiration date is required!"],
    },
    status: {
        type: String,
        enum: ["Open", "In Progress", "Completed"],
        default: "Open",
    },
    location: {
        type: {
            type: String,
            enum: ["Point"], // Ensures only GeoJSON Point type is stored
            default: "Point"
        },
        coordinates: {
            type: [Number], // Stores [longitude, latitude]
        }
    }
},{
    timestamps: true,
})

servicesSchema.index({ location: "2dsphere" });

const servicesModel = mongoose.model("services", servicesSchema);

module.exports = servicesModel;