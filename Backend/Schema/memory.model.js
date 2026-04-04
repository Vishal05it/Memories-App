const mongoose = require("mongoose");
const memorySchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required!"],
        minlength: [2, "Title must be atleast 2 characters long!"]
    },
    description: {
        type: String,
        required: [true, "Description is required!"],
        minlength: [10, "Description must be atleast 10 characters long!"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "Created by user id is required"],
    },
    addedMs: {
        type: Number,
        default: Date.now(),
    }
}, { timestamps: true });
memorySchema.index({ title: 1 });
const memoryModel = mongoose.model("memory", memorySchema);
module.exports = memoryModel;