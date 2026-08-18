import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
const ConnectDB = async () => {
      try {
            await mongoose.connect(process.env.MONGODB_URL);
            console.log("mongoDB connected");
      } catch (error) {
            console.log(`Error in connectDB ${error}`);
            process.exit(1);
      }
};

export default ConnectDB;
