const mongoose = require("mongoose");
const photosSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    forMemory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "memory"
    },
    photo: {
        type: String,
        required: true,
        default: "https://anitacleare.co.uk/wp-content/uploads/2020/01/dimitri-houtteman-2P6Q7_uiDr0-unsplash-768x512.jpg"
    },

}, { timestamps: true });
const photosModel = mongoose.model("photo", photosSchema);
module.exports = photosModel;