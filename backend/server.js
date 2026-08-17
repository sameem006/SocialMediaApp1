import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./db/connectDB.js";
import authRoute from "./routes/auth.routes.js";
const app = express();

dotenv.config();
const PORT = process.env.PORT;

app.use("/", (req, res) => {
      res.send("hi");
});

app.use("api/auth", authRoute);

app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
      ConnectDB();
});
