const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../Schema/user.model");
const userRouter = express.Router();
const { uploadOnCloudinary } = require("../utils/cloudinary");
const upload = require("../Middlewares/multer.middleware");
let verifyUser = require("../Middlewares/verifyUser.middleware");
const jwt = require("jsonwebtoken");
const transport = require("../mailer");
userRouter.post("/signup", upload.single("profilepic"), async (req, res) => {
    try {
        let newUser = {};
        let profilepic = "";
        if (req.file) {
            let localFilePath = req.file?.path;
            profilepic = await uploadOnCloudinary(localFilePath);
        }
        let { email, name, password, age, gender, phoneno, city, state, zipcode, bio } = req.body;
        newUser.email = email;
        let userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(400).send({
                message: "User already registered",
                success: false,
            });
        }
        newUser.name = name;
        if (age) newUser.age = age;
        if (gender) newUser.gender = gender;
        if (phoneno) newUser.phoneno = phoneno;
        if (city) newUser.city = city;
        if (state) newUser.state = state;
        if (zipcode) newUser.zipcode = zipcode;
        if (bio) newUser.bio = bio;
        if (profilepic) newUser.profilepic = profilepic;
        let salt = await bcrypt.genSalt(10);
        let newPassword = await bcrypt.hash(password, salt);
        newUser.password = newPassword;
        let user = await userModel.create(newUser);
        let sendUser = await userModel.findById(user._id).select("-password");
        res.status(200).send({
            message: "Account created successfully",
            success: true,
            newUser: sendUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal Server Error!",
            success: false
        });
    }
});
userRouter.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email) {
            return res.status(404).send({
                message: "Email is required!",
                success: false,
            });
        }
        else if (!password) {
            return res.status(404).send({
                message: "Password is required!",
                success: false,
            });
        }
        let userExist = await userModel.findOne({ email });
        if (!userExist) {
            return res.status(404).send({
                message: "User not found!",
                success: false,
            });
        }
        let realPass = await bcrypt.compare(password, userExist.password);
        if (!realPass) {
            return res.status(401).send({
                message: "Invalid Credentials!",
                success: false,
            });
        }
        const SECRET_KEY = process.env.SECRET_KEY;
        let authToken = jwt.sign({ userId: userExist._id }, SECRET_KEY);
        res.status(200).send({
            message: "Logged in successfully",
            success: true,
            user: userExist,
            authToken,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal Server Error!",
            success: false
        });
    }
});
userRouter.put("/updateprofile", verifyUser, upload.single("profilepic"), async (req, res) => {
    try {
        let newUser = await userModel.findById(req.userId);
        let profilepic = "";
        if (req.file) {
            let localFilePath = req.file?.path;
            profilepic = await uploadOnCloudinary(localFilePath);
        }
        let { name, age, gender, phoneno, city, state, zipcode, bio } = req.body;
        if (name) newUser.name = name;
        if (age) newUser.age = age;
        if (gender) newUser.gender = gender;
        if (phoneno) newUser.phoneno = phoneno;
        if (city) newUser.city = city;
        if (state) newUser.state = state;
        if (zipcode) newUser.zipcode = zipcode;
        if (profilepic) newUser.profilepic = profilepic;
        if (bio) newUser.bio = bio;
        let updatedUser = await newUser.save();
        res.status(200).send({
            message: "Profile updated successfully",
            success: true,
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error!",
            success: false,
        });
    }
});
userRouter.get("/getprofile", verifyUser, async (req, res) => {
    try {
        let user = await userModel.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).send({
                message: "User not found!",
                success: false,
            });
        }
        res.status(200).send({
            message: "User found!",
            success: true,
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error!",
            success: false,
        });
    }
});
userRouter.delete("/deleteprofile", verifyUser, async (req, res) => {
    try {
        let user = await userModel.findById(req.userId);
        if (!user) {
            return res.status(404).send({
                message: "User not found!",
                success: false,
            });
        }
        let deletedUser = await userModel.deleteById(req.userId).select("-password");
        res.status(200).send({
            message: "User found!",
            success: true,
            user: deletedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error!",
            success: false
        });
    }
});
userRouter.put("/forgotpassword/:email/:otpSys/:otpSent", async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.params.email });
        if (req.params.otpSent == "false") {
            if (!user) {
                return res.status(404).send({
                    message: "Email not registered!",
                    success: false
                });
            }
            const message = {
                from: process.env.EMAIL,
                to: user.email,
                subject: "OTP for password updation",
                text: `Hello ${user.name}, the OTP for resetting your password is ${req.params.otpSys}. This OTP is valid for only 2 minutes. If not sent by you, contact us immediately. Thank You!`
            }

            transport.sendMail(message, (err, info) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("Mail successfully sent!", info);
            });
            res.status(200).send({
                message: "OTP sent at registered email",
                success: true,
            });
        }
        else if (req.params.otpSent == "true") {
            let { otpUser, password } = req.body;
            if (req.params.otpSys != otpUser) {
                return res.status(401).send({
                    message: "Invalid OTP",
                    success: false,
                    paramOTP: req.params.otpSys,
                    otpUser: otpUser
                })
            }
            else {
                if (!password || password.length < 8) {
                    return res.status(404).send("Password must be greater than 8 characters");
                }
                let salt = await bcrypt.genSalt(10);
                let newPassword = await bcrypt.hash(password, salt);
                user.password = newPassword;
                let newUser = await user.save();
                res.status(200).send({
                    message: "Password updated successfully",
                    success: true,
                    newUser,
                });
            }

        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error!",
            success: false
        });
    }
})
userRouter.put("/updatepassbyotp/:email/:otpSys/:otpSent", verifyUser, async (req, res) => {
    try {
        let user = await userModel.findById(req.userId);
        if (req.params.otpSent == "false") {
            if (!user) {
                return res.status(404).send({
                    message: "User not found!",
                    success: false
                });
            }
            const message = {
                from: process.env.EMAIL,
                to: user.email,
                subject: "OTP for password updation",
                text: `Hello ${user.name}, the OTP for resetting your password is ${req.params.otpSys}. This OTP is valid for only 2 minutes. If not sent by you, contact us immediately. Thank You!`
            }

            transport.sendMail(message, (err, info) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("Mail successfully sent!", info);
            });
            res.status(200).send({
                message: "OTP sent at registered email",
                success: true,
            });
        }
        else if (req.params.otpSent == "true") {
            let { otpUser, password } = req.body;
            if (req.params.otpSys != otpUser) {
                return res.status(401).send({
                    message: "Invalid OTP",
                    success: false,
                    paramOTP: req.params.otpSys,
                    otpUser: otpUser
                })
            }
            else {
                if (!password || password.length < 8) {
                    return res.status(404).send("Password must be greater than 8 characters");
                }
                let salt = await bcrypt.genSalt(10);
                let newPassword = await bcrypt.hash(password, salt);
                user.password = newPassword;
                let newUser = await user.save();
                res.status(200).send({
                    message: "Password updated successfully",
                    success: true,
                    newUser,
                });
            }

        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error!",
            success: false
        });
    }
});
userRouter.put("/updateemail/:newemail", verifyUser, async (req, res) => {
    try {
        let user = await userModel.findById(req.userId);
        if (!user) {
            return res.status(404).send({
                message: "User not found",
                success: false,
            });
        }
        let findExistAcc = await userModel.findOne({ email: req.params.newemail });
        if (findExistAcc) {
            return res.status(401).send({
                message: "Email already registered",
                success: false,
            });
        }
        let { password } = req.body;
        let decryptPass = await bcrypt.compare(password, user.password);
        if (!decryptPass) {
            return res.status(401).send({
                message: "Password doesn't match",
                success: false,
            });
        }
        user.email = req.params.newemail;
        let newUser = await user.save();
        res.status(200).send({
            message: "Email updated successfully",
            success: true,
            newUser,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error!",
            success: false
        });
    }
});
userRouter.put("/updatepassbyenter", verifyUser, async (req, res) => {
    try {
        let user = await userModel.findById(req.userId);
        if (!user) {
            return res.status(404).send({
                message: "User not found",
                success: false,
            });
        }
        let { password, newPassword } = req.body;
        let decryptPass = await bcrypt.compare(password, user.password);
        if (!decryptPass) {
            return res.status(401).send({
                message: "Password doesn't match",
                success: false,
            });
        }
        let salt = await bcrypt.genSalt(10);
        let newPass = await bcrypt.hash(newPassword, salt);
        user.password = newPass;
        let newUser = await user.save();
        res.status(200).send({
            message: "Password updated successfully",
            success: true,
            newUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error!",
            success: false
        });
    }
})
module.exports = userRouter;