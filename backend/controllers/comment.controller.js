import Comment from "../models/Comment.model.js";
import Post from "../models/Post.model.js";

export const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;

    // Validation
    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "Comment is required.",
      });
    }

    // Check if post exists
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    // Create comment
    const newComment = await Comment.create({
      post: postId,
      author: req.user._id,
      comment,
    });

    // Increase comments count
    await Post.findByIdAndUpdate(postId, {
      $inc: { commentsCount: 1 },
    });

    // Populate author details (optional but useful)
    await newComment.populate("author", "name profilePic");

    return res.status(201).json({
      success: true,
      message: "Comment added successfully.",
      comment: newComment,
    });

  } catch (error) {
    console.error("Create Comment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getComment = async (req, res) => {
  try {

    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("author", "name profilePic")
      .sort({ createdAt: -1 });

    return res.status(200).json(comments);

  } catch (error) {
    console.error("Get Comment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteComment = async (req, res) => {
    try {

        const { id } = req.params;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found.",
            });
        }

        // Check ownership
        if (!comment.author.equals(req.user._id)) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this comment.",
            });
        }

        // Delete comment
        await Comment.findByIdAndDelete(id);

        // Decrease comment count
        await Post.findByIdAndUpdate(comment.post, {
            $inc: { commentsCount: -1 },
        });

        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully.",
        });

    } catch (error) {

        console.error("Delete Comment Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "Comment is required.",
      });
    }

    const searchComment = await Comment.findById(id);

    if (!searchComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found.",
      });
    }

    // Check ownership
    if (!searchComment.author.equals(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this comment.",
      });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      {
        comment,
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate("author", "name profilePic");

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully.",
      comment: updatedComment,
    });

  } catch (error) {
    console.error("Update Comment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};