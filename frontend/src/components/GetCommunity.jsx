import { useState } from "react";
import { axiosInstance } from "../api/axios";
import {
    Trash2,
    SquarePen,
    LoaderCircle,
    MessageSquareText,
    ThumbsUp,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const GetCommunity = ({
    posts,
    setPosts,
    setEditingPost,
    setCommunityModal,
}) => {

    const navigate = useNavigate();
    const [deletingId, setDeletingId] = useState(null);
    const { user: authUser } = useAuth();

    const handleDelete = async (postId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this post?"
        );

        if (!confirmDelete) return;

        setDeletingId(postId);

        try {

            await axiosInstance.delete(
                `/community/posts/${postId}`
            );

            setPosts((prevPosts) =>
                prevPosts.filter(
                    (post) => post._id !== postId
                )
            );

        } catch (error) {
            console.log(error);
        } finally {
            setDeletingId(null);
        }
    };

    const handleLike = async (postId) => {

        try {

            const res = await axiosInstance.post(
                `/community/posts/${postId}/like`
            );

            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId
                        ? {
                              ...post,
                              likesCount:
                                  res.data.liked
                                      ? post.likesCount + 1
                                      : post.likesCount - 1,
                          }
                        : post
                )
            );

        } catch (error) {
            console.log(error);
        }
    };

    if (posts.length === 0) {
        return (
            <div className="rounded-xl bg-base-100 border border-base-300 shadow-md p-10 text-center">
                <p className="text-base-content/70">
                    No posts yet. Be the first one to post.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-xl bg-base-100 border border-base-300 shadow-md p-5">

            {posts.map((post) => (

                <div
                    key={post._id}
                    className="border-b border-base-300 py-5 last:border-none rounded-lg px-2"
                >

                    {/* Top Row */}
                    <div className="flex justify-between items-start">

                        {/* Author */}
                        <div className="flex items-center gap-3">

                            <img
                                src={post.author?.profilePic}
                                alt={post.author?.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />

                            <div>
                                <h2 className="font-semibold">
                                    {post.author?.name}
                                </h2>
                            </div>

                        </div>

                        {/* Owner Actions */}
                        {post.author?._id === authUser?._id && (

                            <div className="flex gap-2 flex-col md:flex-row ">

                                <button
                                    className="btn btn-sm btn-error btn-outline"
                                    disabled={deletingId === post._id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(post._id);
                                    }}
                                >
                                    {deletingId === post._id ? (
                                        <LoaderCircle className="animate-spin w-4 h-4" />
                                    ) : (
                                        <Trash2 className="w-4 h-4" />
                                    )}
                                </button>

                                <button
                                    className="btn btn-sm btn-outline"
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        setEditingPost(post);
                                        setCommunityModal(true);
                                    }}
                                >
                                    <SquarePen className="w-4 h-4" />
                                </button>

                            </div>

                        )}

                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold mt-3">
                        {post.title}
                    </h2>

                    {/* Description */}
                    <p className="mt-2 text-base-content/80 line-clamp-3">
                        {post.description}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-6 mt-4">

                        {/* Comments */}
                        <div
                            className="flex items-center gap-2 cursor-pointer hover:bg-base-200 px-2 py-1 rounded-lg"
                            onClick={() =>
                                navigate(`/community/${post._id}`)
                            }
                        >
                            <MessageSquareText size={18} />
                            <span>{post.commentsCount}</span>
                        </div>

                        {/* Likes */}
                        <div
                            className="flex items-center gap-2 cursor-pointer hover:bg-base-200 px-2 py-1 rounded-lg"
                            onClick={() => handleLike(post._id)}
                        >
                            <ThumbsUp size={18} />
                            <span>{post.likesCount}</span>
                        </div>

                    </div>

                </div>

            ))}

        </div>
    );
};

export default GetCommunity;