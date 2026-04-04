const multer = require("multer");
const path = require("path");
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "/tmp");
    },
    filename: function (req, file, cb) {
        const uniquePath = Date.now() + "_" + Math.random() * 100;
        cb(null, file.fieldname + "_" + uniquePath + path.extname(file.originalname));
    },
});
let upload = multer({ storage });
module.exports = upload;