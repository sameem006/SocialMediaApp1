import Post from "../model/post.model.js";
import User from "../model/user.model.js";

export const createPost = async (req, res) => {
      try {
            const { title, body } = req.body;
            const id = req.user.id;
            const user = await User.findById(id);

            if (!user) {
                  return res.status(404).json({
                        message: "User not found",
                  });
            }
            if (!title || !body) {
                  return res.status(400).json({
                        message: "Title and body are required",
                  });
            }
            const post = await Post.create({
                  userid: user._id,
                  username: user.username,
                  title,
                  body,
            });
            res.status(201).json({
                  post,
            });
      } catch (error) {
            console.log(`Error in createPostcontroller : ${error}`);
            res.status(500).json({ err: "internal server error" });
      }
};

export const getPosts = async (req, res) => {
      try {
            const posts = await Post.find().sort({ createdAt: -1 });

            res.status(200).json(posts);
      } catch (error) {
            console.log(`Error in getPostcontroller : ${error}`);
            res.status(500).json({ err: "internal server error" });
      }
};
