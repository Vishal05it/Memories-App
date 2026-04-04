const jwt = require("jsonwebtoken");
const userModel = require("../Schema/user.model");
let verifyUser = async (req, res, next) => {
    try {
        const SECRET_KEY = process.env.SECRET_KEY;
        let authToken = req.header("authToken");
        if (!authToken) {
            return res.status(404).send({
                message: "Token not found!",
                success: false,
            });
        }
        let decode = jwt.verify(authToken, SECRET_KEY);
        if (!decode) {
            return res.status(401).send({
                message: "Token Invalid",
                success: false,
            });
        }
        req.userId = decode.userId;
        let user = await userModel.findById(req.userId);
        if (!user) {
            return res.status(404).send({
                message: "User not found!",
                success: false,
            });
        }
        return next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Token expired!",
            success: false,
        })
    }
}
module.exports = verifyUser;