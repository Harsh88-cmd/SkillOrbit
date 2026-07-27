import Review from "../models/Review.model.js";
import Session from "../models/Session.model.js";
import User from "../models/User.js";

export const createReview = async (req, res) => {
    try {
        const { sessionId, rating, comment } = req.body;
        const reviewer = req.user.id;

        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: "session not found" });
        }

        if (session.status !== 'completed') {
            return res.status(400).json({ message: "You can only review completed sessions" })
        }

        const isParticipant = session.participants.some(
            (participant) => participant.toString() === reviewer.toString()
        );

        if (!isParticipant) {
            return res.status(403).json({ message: "You are not part of this session", });
        }

        const reviewee = session.participants.find(
            (participant) => participant.toString() !== reviewer.toString()
        );

        const alreadyReviewed = await Review.findOne({
            session: sessionId,
            reviewer,
        });

        if (alreadyReviewed) {
            return res.status(400).json({ message: "You have already reviewed this session", });
        }

        const review = await Review.create({
            session: sessionId,
            reviewer,
            reviewee,
            rating,
            comment,
        });

        return res.status(201).json({
            message: "Review submitted successfully",
            review,
        });

    } catch (error) {
        console.error("Error creating review:", error.message);
        return res.status(500).json({ message: "Something went wrong", error: error.message });

    }
}

export const getUserReview = async (req, res) => {
    try {
        const { userId } = req.params;

        const reviews = await Review.find({ reviewee: userId })
            .populate("reviewer", "name profilePic")
            .sort({ createdAt: -1 });

        // rating ka sum
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

        // average
        const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

        return res.status(200).json({
            reviews,
            averageRating,
            totalReviews: reviews.length,
        });

    } catch (error) {
        console.error("Error fetching reviews:", error.message);
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        if (review.reviewer.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not allowed to delete this review" });
        }

        await Review.findByIdAndDelete(reviewId);
        res.status(200).json({ message: "Review delete successfully" });
    } catch (error) {
        console.error("Error while deleting review:", error.message);
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}