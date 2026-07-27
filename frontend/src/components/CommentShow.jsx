import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axios";
import toast from "react-hot-toast";
import { Trash2, LoaderCircle, Pencil } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const CommentShow = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const { user: authUser } = useAuth();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [editedComment, setEditedComment] = useState("");
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchPost();
        fetchComment();
    }, []);

    const fetchPost = async () => {
        try {
            const res = await axiosInstance.get( `/community/getSinglePost/${postId}`);

            setPost(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchComment = async () => {
        try {
            const res = await axiosInstance.get(
                `/community/posts/${postId}/getcomments`
            );

            setComments(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleComment = async () => {
        if (!comment.trim()) {
            return toast.error("Comment is required");
        }

        setLoading(true);

        try {
            await axiosInstance.post(
                `/community/posts/${postId}/createcomments`,
                {
                    comment,
                }
            );

            toast.success("Comment added");
            setComment("");

            // Refresh comments immediately
            await fetchComment();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this comment?"
        );

        if (!confirmDelete) return;

        setDeletingId(commentId);

        try {
            await axiosInstance.delete(
                `/community/posts/${postId}/comments/${commentId}`
            );

            toast.success("Comment deleted successfully");

            setComments((prev) =>
                prev.filter((comment) => comment._id !== commentId)
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        } finally {
            setDeletingId(null);
        }
    };

    const handleEdit = async (commentId) => {
    try {

        const res = await axiosInstance.put(
            `/community/posts/${postId}/comments/${commentId}`,
            {
                comment: editedComment,
            }
        );

        setComments((prev) =>
            prev.map((item) =>
                item._id === commentId
                    ? res.data.comment
                    : item
            )
        );

        setEditingId(null);
        setEditedComment("");

        toast.success("Comment updated successfully");

    } catch (error) {

        toast.error(
            error.response?.data?.message || "Something went wrong"
        );

    }
};

    if (!post) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200">
            {/* Navbar */}
            <div className="bg-base-100 border-b px-6 py-4 flex items-center gap-3">
                <button
                    className="btn btn-sm"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>

                <h1 className="text-xl font-bold">
                    Community Discussion
                </h1>
            </div>

            <div className="max-w-4xl mx-auto p-6">
                {/* Post */}
                <div className="bg-base-100 rounded-xl shadow p-6">
                    <div className="flex items-center gap-3">
                        <img
                            src={post.author?.profilePic}
                            className="w-20 h-20 rounded-full object-cover"
                            alt={post.author?.name}
                        />

                        <div>
                            <h2 className="font-bold">
                                {post.author?.name}
                            </h2>

                            <span className="badge badge-primary">
                                {post.category}
                            </span>
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold mt-5">
                        {post.title}
                    </h1>

                    <p className="mt-3">
                        {post.description}
                    </p>
                </div>

                {/* Comment Box */}
                <div className="bg-base-100 rounded-xl shadow mt-6 p-5">
                    <h2 className="font-bold mb-3">
                        Add a Comment
                    </h2>

                    <textarea
                        className="textarea textarea-bordered w-full h-28"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment..."
                    />

                    <button
                        className="btn btn-primary mt-4"
                        onClick={handleComment}
                        disabled={loading}
                    >
                        {loading ? "Posting..." : "Post Comment"}
                    </button>
                </div>

                {/* Comments */}
                <div className="bg-base-100 rounded-xl shadow mt-6 p-5">
                    <h2 className="text-xl font-bold mb-5">
                        Comments
                    </h2>

                    {comments.length === 0 ? (
                        <p>No comments yet.</p>
                    ) : (
                        comments.map((item) => (
                            <div
                                key={item._id}
                                className="border-b py-4 last:border-none"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={item.author?.profilePic}
                                            className="w-10 h-10 rounded-full object-cover"
                                            alt={item.author?.name}
                                        />

                                        <div>
                                            <h3 className="font-semibold">
                                                {item.author?.name}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        {item.author?._id === authUser?._id && (
                                            <button
                                                className="btn btn-sm btn-error btn-outline"
                                                disabled={deletingId === item._id}
                                                onClick={() =>
                                                    handleDeleteComment(item._id)
                                                }
                                            >
                                                {deletingId === item._id ? (
                                                    <LoaderCircle className="animate-spin w-4 h-4" />
                                                ) : (
                                                    <Trash2 className="w-4 h-4" />
                                                )}

                                            </button>
                                        )}

                                        <button
                                            className="btn btn-sm btn-outline"
                                            onClick={() => {
                                                setEditingId(item._id);
                                                setEditedComment(item.comment);
                                            }}
                                        >
                                            <Pencil />
                                        </button>
                                    </div>
                                </div>

                                {editingId === item._id ? (
                                    <>
                                        <textarea
                                            className="textarea textarea-bordered w-full mt-3"
                                            value={editedComment}
                                            onChange={(e) => setEditedComment(e.target.value)}
                                        />

                                        <button
                                            className="btn btn-primary btn-sm mt-2"
                                            onClick={() => handleEdit(item._id)}
                                        >
                                            Save
                                        </button>

                                        <button
                                            className="btn btn-sm mt-2 ml-2"
                                            onClick={() => setEditingId(null)}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <p className="mt-3">
                                        {item.comment}
                                    </p>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentShow;