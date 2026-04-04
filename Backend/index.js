const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const connectToDB = require("./connectToDB");
const PORT = process.env.PORT || 2000;
const cors = require("cors");
const userRouter = require("./Routes/user.router");
const memoryRouter = require("./Routes/memory.router");
const photoRouter = require("./Routes/photo.router");
app.use(express.json());
app.use(cors
    ({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"]
    })
);
app.use("/user/api", userRouter);
app.use("/memory/api", memoryRouter);
app.use("/photo/api", photoRouter);
app.listen(PORT, () => {
    console.log(`Server is runnning at : http://localhost:${PORT}`);
});
connectToDB();