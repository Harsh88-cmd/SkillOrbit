import { useState } from 'react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../api/axios.js';

const ReviewModal = ({ sessionId, onClose, onReviewSubmitted }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!comment || !rating) {
            toast.error('All fields are required');
            return;
        }
        setLoading(true);
        try {
            const res = await axiosInstance.post('/reviews/createReview', {
                sessionId,
                rating,
                comment,
            });

            toast.success('Review submitted successfully');
            onReviewSubmitted?.(res.data.review); // parent ko naya review de do (list update karne ke liye)
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <dialog className="modal modal-open">
            <div className="modal-box">

                <h3 className="font-bold text-lg">Review & Rating</h3>

                {/* Rating */}
                <label className="form-control w-full mt-4">
                    <div className="label">
                        <span className="label-text">Rating</span>
                    </div>

                    <div className="rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <input
                                key={star}
                                type="radio"
                                name="rating"
                                className="mask mask-star"
                                checked={rating === star}
                                onChange={() => setRating(star)}
                            />
                        ))}
                    </div>
                </label>

                {/* Comment */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Review</span>
                    </div>

                    <textarea
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        maxLength={300}
                        className="textarea textarea-bordered w-full"
                        placeholder="Write your review..."
                    />
                    <div className="label">
                        <span className="label-text-alt">{comment.length} / 300</span>
                    </div>
                </label>

                <div className="modal-action mt-2">
                    <button className="btn" onClick={onClose} disabled={loading}>
                        Cancel
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading
                            ? <span className="loading loading-spinner loading-sm" />
                            : 'Submit'
                        }
                    </button>
                </div>

            </div>
            <div className="modal-backdrop" onClick={onClose} />
        </dialog>
    );
};

export default ReviewModal;