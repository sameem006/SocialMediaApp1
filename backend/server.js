import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./db/connectDB.js";
import authRoute from "./routes/auth.routes.js";
import postRoute from "./routes/post.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(
      cors({
            origin: "http://localhost:3000",
            credentials: true,
      }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
      ConnectDB();
});
