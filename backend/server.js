import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./db/connectDB.js";
import authRoute from "./routes/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
      ConnectDB();
});
