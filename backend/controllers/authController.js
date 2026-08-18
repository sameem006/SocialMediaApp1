import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signUp = async (req, res) => {
      try {
            const { username, fullName, email, password } = req.body;
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                  return res.status(400).json({ error: "invalid email format" });
            }

            const existingEmail = await User.findOne({ email });
            const existingUsername = await User.findOne({ username });

            if (existingEmail || existingUsername) {
                  return res.status(400).json({ error: "email or username already exist" });
            }

            if (password.length < 6) {
                  return res.status(400).json({ error: "password must have atleast 6 chars" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                  username,
                  email,
                  fullName,
                  password: hashedPassword,
            });

            if (newUser) {
                  generateToken(newUser._id, res);
                  await newUser.save();
                  res.status(200).json({
                        _id: newUser._id,
                        username: newUser.username,
                        email: newUser.email,
                        fullName: newUser.fullName,
                  });
            } else {
                  res.status(400).json({ error: "invalid user data" });
            }
      } catch (error) {
            console.log(`error in signup controller: ${err}`);
            res.status(500).json("internal server error");
      }
};

export const login = async (req, res) => {
      try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

            if (!user || !isPasswordCorrect) {
                  return res.status(400).json({ error: "email or password invalid" });
            }

            generateToken(user._id, res);
            res.status(200).json({
                  _id: user._id,
                  username: user.username,
                  fullName: user.fullName,
                  email: user.email,
            });
      } catch (err) {
            console.log(`Error in login controller : ${err}`);
            res.status(500).json({ err: "internal server error" });
      }
};
