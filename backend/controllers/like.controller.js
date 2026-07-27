import Like from "../models/Like.model.js";
import Post from "../models/Post.model.js";

export const toggleLike = async (req, res) => {
    try {
        const { postId } = req.params;

        const existingLike = await Like.findOne({
            post: postId,
            user: req.user._id,
        });

        if (existingLike) {
            await Like.findByIdAndDelete(existingLike._id);

            await Post.findByIdAndUpdate(postId, {
                $inc: { likesCount: -1 },
            });

            return res.status(200).json({
                liked: false,
            });
        }

        await Like.create({
            post: postId,
            user: req.user._id,
        });

        await Post.findByIdAndUpdate(postId, {
            $inc: { likesCount: 1 },
        });

        return res.status(200).json({
            liked: true,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};