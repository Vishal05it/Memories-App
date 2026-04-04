const express = require("express");
const memoryRouter = express.Router();
const verifyUser = require("../Middlewares/verifyUser.middleware");
const memoryModel = require("../Schema/memory.model");
const photosModel = require("../Schema/photos.model");
const upload = require("../Middlewares/multer.middleware");
const { uploadOnCloudinary } = require("../utils/cloudinary");
memoryRouter.get("/getmymemories", verifyUser, async (req, res) => {
    try {
        let allMemories = await memoryModel.find({ createdBy: req.userId });
        if (allMemories.length <= 0) {
            return res.status(404).send({
                message: "You have no memories",
                success: false,
            });
        }
        res.status(200).send({
            message: "All your memories fetched",
            success: true,
            allMemories,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error",
            success: false,
        });
    }
});
memoryRouter.get("/getonememory/:memoryId", verifyUser, async (req, res) => {
    try {
        let oneMemory = await memoryModel.findOne({ createdBy: req.userId, _id: req.params.memoryId });
        if (!oneMemory) {
            return res.status(404).send({
                message: "Memory not found",
                success: false,
            });
        }
        let findPics = await photosModel.find({ createdBy: req.userId, forMemory: oneMemory._id });
        res.status(200).send({
            message: "Memory fetched",
            success: true,
            oneMemory,
            findPics,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error",
            success: false,
        });
    }
});
memoryRouter.post("/creatememory", verifyUser, upload.array("photos"), async (req, res) => {
    try {
        let { title, description, addedMs } = req.body;
        let photoUrls = [];
        if (req.files && req.files.length > 0) {
            photoUrls = await Promise.all(
                req.files.map(async (elm) => {
                    let localFilePath = elm?.path;
                    let photo = await uploadOnCloudinary(localFilePath);
                    return photo;
                })
            );
        }
        let newMemory = {};
        newMemory.title = title;
        newMemory.createdBy = req.userId;
        newMemory.description = description;
        newMemory.addedMs = addedMs;
        let memory = await memoryModel.create(newMemory);
        let allPics = []
        if (photoUrls.length > 0) {
            allPics = photoUrls.map((elm) => {
                return {
                    createdBy: req.userId,
                    forMemory: memory._id,
                    photo: elm,
                }
            })
        }
        let photoDoc = await photosModel.create(allPics);
        res.status(200).send({
            message: "Memory created successfully",
            success: true,
            memory,
            photoDoc
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error",
            success: false,
        });
    }
});
memoryRouter.put("/updatememory/:memoryId", verifyUser, upload.array("photos"), async (req, res) => {
    try {
        let { title, description, addedMs } = req.body;
        let photoUrls = [];
        if (req.files && req.files.length > 0) {
            photoUrls = await Promise.all(
                req.files.map(async (elm) => {
                    let localFilePath = elm.path;
                    let photo = await uploadOnCloudinary(localFilePath);
                    return photo;
                })
            );
        }
        let newMemory = {}
        newMemory.title = title;
        newMemory.description = description;
        newMemory.addedMs = addedMs;
        if (photoUrls.length > 0) {
            allPics = photoUrls.map((elm) => {
                return {
                    createdBy: req.userId,
                    forMemory: req.params.memoryId,
                    photo: elm,
                }
            })
        }
        let photoDoc = await photosModel.create(allPics);
        let updatedMemory = await memoryModel.updateOne({ _id: req.params.memoryId }, newMemory);
        if (!updatedMemory) {
            return res.status(404).send({
                message: "Memory doesn't exist",
                success: false,
            });
        }
        res.status(200).send({
            message: "Memory updated successfully",
            success: true,
            updatedMemory,
            photoDoc
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error",
            success: false,
        });
    }
});
memoryRouter.get("/searchmemory", verifyUser, async (req, res) => {
    try {
        let keyword = req.query.keyword;
        let searchMemories = await memoryModel.find({ $or: [{ title: { $regex: keyword, $options: "i" } }, { description: { $regex: keyword, $options: "i" } }] });
        if (searchMemories.length <= 0) {
            return res.status(404).send({
                message: "No such memory",
                success: false,
            });
        }
        res.status(200).send({
            message: "All memories found!",
            success: true,
            searchMemories,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error",
            success: false,
        });
    }
})
memoryRouter.delete("/deletememory/:memoryId", verifyUser, async (req, res) => {
    try {
        let deletedMemory = await memoryModel.findByIdAndDelete(req.params.memoryId);
        if (!deletedMemory) {
            return res.status(404).send({
                message: "Memory doesn't exist!",
                success: false,
            })
        }
        let removedPhotos = await photosModel.deleteMany({ forMemory: req.params.memoryId });
        res.status(200).send({
            message: "Memory successfully deleted",
            success: true,
            deletedMemory,
            removedPhotos,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error",
            success: false,
        });
    }
})
module.exports = memoryRouter;