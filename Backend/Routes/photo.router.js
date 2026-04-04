const express = require("express");
const photoRouter = express.Router();
const photosModel = require("../Schema/photos.model");
const verifyUser = require("../Middlewares/verifyUser.middleware");
photoRouter.get("/getallphotos/:memoryId", verifyUser, async (req, res) => {
    try {
        let allPics = await photosModel.find({ createdBy: req.userId, forMemory: req.params.memoryId });
        res.status(200).send({
            message: "All photos found",
            success: true,
            allPics
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error",
            success: false,
        })
    }
});
photoRouter.delete("/deletephoto/:photoId", verifyUser, async (req, res) => {
    try {
        let deletedPhoto = await photosModel.findByIdAndDelete(req.params.photoId);
        if (!deletedPhoto) {
            return res.status(404).send({
                message: "Photo not found",
                success: false,
            });
        }
        res.status(200).send({
            message: "Photo removed successfully",
            success: true,
            deletedPhoto
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error",
            success: false,
        });
    }
});
module.exports = photoRouter;