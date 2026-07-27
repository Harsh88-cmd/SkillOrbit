import { useState, useEffect } from "react";
import { axiosInstance } from "../api/axios";
import { Send, Star, Trash2 } from "lucide-react";

const ReviewList = ({ userId, showDeleteButton = true }) => {
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axiosInstance.get(`/reviews/user/${userId}`);
                setReviews(res.data.reviews);
                setAverageRating(res.data.averageRating);
                setTotalReviews(res.data.totalReviews);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchReviews();
    }, [userId]);

    const handleDelete = async (reviewId) => {
        try {
            await axiosInstance.delete(`/reviews/deleteReview/${reviewId}`);
            setReviews((prevReviews) =>
                prevReviews.filter((review) => review._id !== reviewId)
            );
        } catch (error) {
            console.log(error);
        }
    }

    if (loading) return (
        <div className="flex flex-col gap-4 p-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="card bg-base-100 border border-base-300 shadow-sm p-4">
                    <div className="flex items-center gap-4">
                        <div className="skeleton w-14 h-14 rounded-full shrink-0" />
                        <div className="flex flex-col gap-2 flex-1">
                            <div className="skeleton h-4 w-32" />
                            <div className="skeleton h-3 w-48" />
                            <div className="flex gap-2">
                                <div className="skeleton h-5 w-16 rounded-full" />
                                <div className="skeleton h-5 w-16 rounded-full" />
                            </div>
                        </div>
                        <div className="skeleton h-6 w-20 rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    );

    if (reviews.length === 0) return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="bg-base-200 rounded-full p-6">
                <Send size={40} className="text-base-content/30" />
            </div>
            <h3 className="text-lg font-semibold text-base-content/50">No Review</h3>
            <p className="text-sm text-base-content/40">
                You do not get any rating and reviews yet
            </p>
        </div>
    );

    return (
        <div className="flex flex-col gap-5">

            {/* Average Rating Summary */}
            <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-base-content">
                    {averageRating.toFixed(1)}
                </span>

                <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={18}
                            className={
                                star <= Math.round(averageRating)
                                    ? "fill-warning text-warning"
                                    : "text-base-300"
                            }
                        />
                    ))}
                </div>

                <span className="text-sm text-base-content/60">
                    ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
                </span>
            </div>

            {/* Reviews List */}
            <div className="flex flex-col gap-4">
                {reviews.map((review) => (
                    <div
                        key={review._id}
                        className="card bg-base-100 border border-base-300 shadow-sm p-4"
                    >
                        <div className="flex items-start gap-3">

                            {/* Avatar */}
                            <div className="avatar placeholder shrink-0">
                                <div className="bg-primary/10 text-primary rounded-full w-12">
                                    {review.reviewer?.profilePic ? (
                                        <img
                                            src={review.reviewer.profilePic}
                                            alt={review.reviewer.name}
                                        />
                                    ) : (
                                        <span className="text-sm font-semibold">
                                            {review.reviewer?.name?.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col flex-1 gap-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-base-content">
                                        {review.reviewer?.name}
                                    </h4>
                                    <span className="text-xs text-base-content/50">
                                        {new Date(review.createdAt).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </span>

                                    {showDeleteButton && (
                                        <button
                                            className="absolute bottom-3 right-3 btn btn-circle btn-xs btn-error"
                                            onClick={() => handleDelete(review._id)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}

                                </div>

                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            size={14}
                                            className={
                                                star <= review.rating
                                                    ? "fill-warning text-warning"
                                                    : "text-base-300"
                                            }
                                        />
                                    ))}
                                </div>

                                <p className="text-sm text-base-content/70 mt-1">
                                    {review.comment}
                                </p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ReviewList;