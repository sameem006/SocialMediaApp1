import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const protectRoute = async (req, res, next) => {
      try {
            const token = req.cookies.jwt;
            if (!token) {
                  return res.status(400).json({ error: "UnAuthorized : no token provided" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) {
                  return res.status(400).json({ error: "UnAuthorized : invalid token" });
            }

            const user = await User.findOne({ _id: decoded.userId }).select("-password");
            if (!user) {
                  return res.status(404).json({ error: "User not found" });
            }
            req.user = user;
            next();
      } catch (err) {
            res.status(400).json({});
      }
};

export default protectRoute;
