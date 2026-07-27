import Post from "../models/Post.model.js";
import Comment from "../models/Comment.model.js";
import Like from "../models/Like.model.js";

export const createPost = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const post = await Post.create({
      author: req.user._id, title, description, category,
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully.",
      post,
    });
  } catch (error) {
    console.error("Create Post Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getPosts = async (req, res) => {
  try {

    const posts = await Post.find({}).populate('author', 'name profilePic')
      .sort({ createdAt: -1 })

    res.status(200).json(posts);

  } catch (error) {
    console.error("Create Post Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    // Check if post exists
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post does not exist.",
      });
    }

    // Check ownership
    if (!post.author.equals(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this post.",
      });
    }

    // Delete the post
    await Post.findByIdAndDelete(postId);

    // Delete all comments related to this post
    await Comment.deleteMany({ post: postId });

    // Delete all likes related to this post
    await Like.deleteMany({ post: postId });

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully.",
    });

  } catch (error) {
    console.error("Delete Post Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { category, title, description } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post does not exist.",
      });
    }

    if (!post.author.equals(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this post.",
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        category,
        title,
        description,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Post updated successfully.",
      post: updatedPost,
    });

  } catch (error) {
    console.error("Update Post Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getSinglePost = async (req, res) => {

  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate('author', 'name profilePic');

    if (!post) {
      return res.status(404).json({ success: false, message: "Post does not exist.", });
    }
    res.status(200).json(post);

  } catch (error) {
    console.error("Get single post:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}