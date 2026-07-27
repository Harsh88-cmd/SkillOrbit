import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";
import { ArrowLeft, Clock, CheckCircle, XCircle, Loader } from "lucide-react";
import Sidebar from "../components/Sidebar";
import ProfileHeader from "../components/ProfileHeader";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import ScheduleSessionModal from "../components/SheduleSessionModal";
import ReviewModal from "../components/ReviewModal";
import ReviewList from "../components/ReviewList";

const OtherUserProfile = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const { user: authUser } = useAuth();

    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);

    const [requestStatus, setRequestStatus] = useState(null);
    const [requestId, setRequestId] = useState(null);
    const [requestLoading, setRequestLoading] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviewSessionId, setReviewSessionId] = useState(null);
    const [reviewCheckLoading, setReviewCheckLoading] = useState(false);


    // Fetch Other User
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setUserLoading(true);
                const res = await axiosInstance.get(`/students/${userId}`);
                setUser(res.data);
            } catch (error) {
                console.error("fetchUser error:", error);
                toast.error("Failed to load profile");
            } finally {
                setUserLoading(false);
            }
        };
        fetchUser();
    }, [userId]);

    const handleMessageClick = () => {
        navigate("/messages", { state: { selectedUser: user } }); // 'user' = wo profile jisko dekh rahe ho
    };

    // Check Request Status
    useEffect(() => {
        const checkRequest = async () => {
            if (!authUser?._id) return;
            try {
                const res = await axiosInstance.get(`/requests/check/${userId}`);
                if (res.data.exists) {
                    setRequestStatus(res.data.status);
                    setRequestId(res.data.requestId);
                } else {
                    setRequestStatus(null);
                    setRequestId(null);
                }
            } catch (error) {
                console.error("checkRequest error:", error);
            }
        };
        checkRequest();
    }, [userId, authUser]);

    // Send Request
    const handleSendRequest = async () => {
        if (!authUser?._id) return;
        setRequestLoading(true);
        try {
            const res = await axiosInstance.post('/requests/send', {
                receiverId: userId,
            });
            setRequestStatus('pending');
            setRequestId(res.data.request._id);
            toast.success("Request sent successfully!");
        } catch (error) {
            console.error("sendRequest error:", error);
            toast.error(error.response?.data?.message || "Failed to send request");
        } finally {
            setRequestLoading(false);
        }
    };

    // Cancel Request 
    const handleCancelRequest = async () => {
        if (!requestId) return;
        setRequestLoading(true);
        try {
            await axiosInstance.delete(`/requests/delete/${requestId}`);
            setRequestStatus(null);
            setRequestId(null);
            toast.success("Request cancelled");
        } catch (error) {
            console.error("cancelRequest error:", error);
            toast.error("Failed to cancel request");
        } finally {
            setRequestLoading(false);
        }
    };

    const handleReviewClick = async () => {
        setReviewCheckLoading(true);
        try {
            const res = await axiosInstance.get(`/sessions/latest-completed/${userId}`);

            if (!res.data.sessionId) {
                toast.error("You don't have any completed session with this user yet");
                return;
            }

            setReviewSessionId(res.data.sessionId);
            setShowReviewModal(true);
        } catch (error) {
            console.error("handleReviewClick error:", error);
            toast.error("Something went wrong");
        } finally {
            setReviewCheckLoading(false);
        }
    };

    // Request Button
    const renderRequestButton = () => {
        if (requestLoading) {
            return (
                <button className="btn btn-primary" disabled>
                    <Loader size={16} className="animate-spin" /> Loading...
                </button>
            );
        }

        switch (requestStatus) {
            case 'pending':
                return (
                    <div className="flex gap-2">
                        <button className="btn btn-warning btn-outline gap-1" disabled>
                            <Clock size={16} /> Pending
                        </button>
                        <button
                            className="btn btn-error btn-outline btn-sm self-center"
                            onClick={handleCancelRequest}
                        >
                            Cancel
                        </button>
                    </div>
                );
            case 'accepted':
                return (
                    <button className="btn btn-success gap-1" disabled>
                        <CheckCircle size={16} /> Connected
                    </button>
                );
            case 'rejected':
                return (
                    <button className="btn btn-error btn-outline gap-1" disabled>
                        <XCircle size={16} /> Request Rejected
                    </button>
                );
            default:
                return (
                    <button
                        className="btn btn-primary"
                        onClick={handleSendRequest}
                        disabled={requestLoading}
                    >
                        Send Request
                    </button>
                );
        }
    };

    // Loading Screen
    if (userLoading) {
        return (
            <div className="h-screen flex overflow-hidden bg-base-200">
                <Sidebar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <span className="loading loading-spinner loading-lg text-primary" />
                        <p className="text-base-content/50 text-sm">Loading profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    // User Not Found
    if (!user) {
        return (
            <div className="h-screen flex overflow-hidden bg-base-200">
                <Sidebar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="text-6xl">😕</div>
                        <h2 className="text-xl font-bold text-base-content">User not found</h2>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex overflow-hidden bg-base-200 transition-colors duration-300">
            <Sidebar />

            <div className="flex-1 overflow-y-auto lg:ml-64 pt-16 lg:pt-0">
                <div className="p-8">
                    {/* ── Header Card ── */}
                    <div className="card bg-base-100 border border-base-300 shadow-md p-8">
                        <div className="flex items-center gap-8 flex-wrap">

                            <ProfileHeader user={user} editable={false} />

                            {/* User Info */}
                            <div className="flex flex-col gap-1">
                                <h1 className="text-3xl font-bold text-base-content">
                                    {user.name}
                                </h1>
                                <p className="text-base-content/60 font-medium">
                                    {user.role || "No role set"}
                                </p>
                                <p className="text-base-content/60 font-medium">
                                    {user.college}
                                </p>
                                <div className="badge badge-primary badge-outline mt-1 p-3">
                                    BTech — {user.department}
                                </div>
                            </div>


                            {/* Action Buttons */}
                            <div className="ml-auto flex gap-3 flex-wrap">
                                {renderRequestButton()}

                                {requestStatus === 'accepted' && (
                                    <button
                                        className="btn btn-success"
                                        onClick={() => setShowScheduleModal(true)}
                                    >
                                        Schedule Session
                                    </button>
                                )}

                                {showScheduleModal && (
                                    <ScheduleSessionModal
                                        otherUserId={userId}
                                        onClose={() => setShowScheduleModal(false)}
                                    />
                                )}

                                <button onClick={handleMessageClick} className="btn btn-primary">
                                    Message
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* ── Details Card ── */}
                    <div className="card bg-base-100 border border-base-300 shadow-md mt-6 p-6">

                        {/* About */}
                        <h2 className="text-2xl font-bold text-base-content mb-3">
                            About Me
                        </h2>
                        <p className="border-b border-base-300 pb-5 text-base-content/80 font-medium leading-7">
                            {user.bio || "No bio added yet"}
                        </p>

                        {/* Stats Row */}
                        <div className="stats stats-horizontal shadow-sm border border-base-300 mt-6 w-full">
                            <div className="stat">
                                <div className="stat-title">Skills Teaching</div>
                                <div className="stat-value text-primary text-2xl">
                                    {user.teachSkills?.length || 0}
                                </div>
                            </div>
                            <div className="stat">
                                <div className="stat-title">Skills Learning</div>
                                <div className="stat-value text-accent text-2xl">
                                    {user.learnSkills?.length || 0}
                                </div>
                            </div>
                        </div>

                        {/* Teach Skills */}
                        <div className="mt-6">
                            <h2 className="font-bold text-xl text-primary mb-4">
                                Skills I Can Teach
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {user.teachSkills?.length > 0 ? (
                                    user.teachSkills.map((skill, index) => (
                                        <div
                                            key={index}
                                            className="badge badge-primary badge-outline p-4 text-sm font-semibold"
                                        >
                                            {skill}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-base-content/50">No skills added</p>
                                )}
                            </div>
                        </div>

                        {/* Learn Skills */}
                        <div className="mt-8">
                            <h2 className="font-bold text-xl text-accent mb-4">
                                Skills I Want To Learn
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {user.learnSkills?.length > 0 ? (
                                    user.learnSkills.map((skill, index) => (
                                        <div
                                            key={index}
                                            className="badge badge-accent badge-outline p-4 text-sm font-semibold"
                                        >
                                            {skill}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-base-content/50">No skills added</p>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Review and Rating wala part */}
                    <div className="card bg-base-100 border border-base-300 shadow-md mt-6 p-6">
                        <button
                            className="btn btn-secondary"
                            onClick={handleReviewClick}
                            disabled={reviewCheckLoading}
                        >
                            {reviewCheckLoading
                                ? <span className="loading loading-spinner loading-sm" />
                                : "Leave Review"
                            }
                        </button>
                        <ReviewList userId={userId} />
                    </div>

                    {showReviewModal && (
                        <ReviewModal
                            sessionId={reviewSessionId}
                            onClose={() => setShowReviewModal(false)}
                        />
                    )}

                </div>
            </div>
        </div>
    );
};

export default OtherUserProfile;