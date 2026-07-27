import { useState, useEffect } from "react";
import { axiosInstance } from "../api/axios";
import { Star } from "lucide-react";

const RatingBadge = ({ userId }) => {
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRating = async () => {
            try {
                const res = await axiosInstance.get(`/reviews/user/${userId}`);
                setAverageRating(res.data.averageRating);
                setTotalReviews(res.data.totalReviews);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        if (userId) fetchRating();
    }, [userId]);

    if (loading) return <div className="skeleton h-5 w-16 rounded-full" />;

    if (totalReviews === 0) {
        return <span className="text-xs text-base-content/40">No reviews yet</span>;
    }

    return (
        <div className="flex items-center gap-1">
            <Star size={25} className="fill-warning text-warning" />
            <span className="text-xl font-semibold text-base-content">
                {averageRating.toFixed(1)}
            </span>
            <span className="text-xs text-base-content/50">
                ({totalReviews})
            </span>
        </div>
    );
};

export default RatingBadge;