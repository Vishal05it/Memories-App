const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required!"],
        lowercase: true,
        unique: true,
        match: [/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim, "Invalid email!"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minlength: [8, "Password must be atleast 8 characters long!"]
    },
    name: {
        type: String,
        required: [true, "Name is required!"],
        minlength: [2, "Name must be atleast 2 characters long!"],
    },
    age: {
        type: Number,
        default: null
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"],
        default: "Male"
    },
    phoneno: {
        type: String,
        minlength: [10, "Phone number must be 10 digits long"],
        maxlength: [10, "Phone number must be only 10 digits long"],
        default: null
    },
    city: {
        type: String,
        default: null
    },
    state: {
        type: String,
        default: null
    },
    zipcode: {
        type: Number,
        default: null
    },
    bio: {
        type: String,
        default: null
    },
    profilepic: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPHHLCPnASW-uMU5Iun97gCckqqlm6DAh5-Q&s"
    }
}, { timestamps: true });
userSchema.index({ name: 1 });
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;