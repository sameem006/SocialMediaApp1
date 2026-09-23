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

export const updatePost = async (req, res) => {
      try {
            const post = await Post.findById(req.params.id);

            if (!post) {
                  return res.status(404).json({
                        message: "Post not found",
                  });
            }

            if (post.userid.toString() !== req.user.id) {
                  return res.status(403).json({
                        message: "You can only edit your own post",
                  });
            }

            post.title = req.body.title;
            post.body = req.body.body;

            const upDatedPost = await post.save();

            res.status(200).json(upDatedPost);
      } catch (error) {
            console.log(`Error in updatePostcontroller : ${error}`);
            res.status(500).json({ err: "internal server error" });
      }
};

export const deletePost = async (req, res) => {
      try {
            const post = await Post.findById(req.params.id);

            if (!post) {
                  return res.status(404).json({
                        message: "Post not found",
                  });
            }

            if (post.userid.toString() !== req.user.id) {
                  return res.status(403).json({
                        message: "You can only delete your own post",
                  });
            }

            await post.deleteOne();

            res.status(200).json({
                  message: "Post deleted successfully",
            });
      } catch (error) {
            console.log(`Error in deletePost controller : ${error}`);
            res.status(500).json({ err: "internal server error" });
      }
};

export const getPost = async (req, res) => {
      try {
            const { id } = req.params;
            const post = await Post.findById(id);

            if (!post) {
                  return res.status(404).json({ error: "Post Not Found" });
            }

            res.status(200).json({ post });
      } catch (error) {
            console.log(`Error in getPost controller : ${error}`);
            res.status(500).json({ err: "internal server error" });
      }
};
