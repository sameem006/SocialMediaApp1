import mongoose from "mongoose";

const postSchema = mongoose.Schema(
      {
            userid: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User",
                  required: true,
            },

            username: {
                  type: String,
                  required: true,
            },

            title: {
                  type: String,
                  required: true,
            },

            body: {
                  type: String,
                  required: true,
            },
      },
      {
            timestamps: true,
      },
);

const Post = mongoose.model("Post", postSchema);

export default Post;
