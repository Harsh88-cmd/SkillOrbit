import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { CheckCircle, XCircle, Inbox } from "lucide-react";
import { useNavigate } from "react-router-dom";


const ReceivedRequest = () => {
    const navigate = useNavigate();
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user: authUser } = useAuth();

    useEffect(() => {
        const fetchReceivedRequests = async () => {
            try {
                const res = await axiosInstance.get('/requests/received');
                setReceivedRequests(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchReceivedRequests();
    }, []);

    const handleAction = async (requestId, status) => {
        try {
            await axiosInstance.patch(`/requests/update/${requestId}`, { status });
            setReceivedRequests(prev =>
                prev.map(r => r._id === requestId ? { ...r, status } : r)
            );
        } catch (error) {
            console.log(error);
        }
    };
    // Loading Skeleton
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
                        <div className="flex gap-2">
                            <div className="skeleton h-8 w-20 rounded-lg" />
                            <div className="skeleton h-8 w-20 rounded-lg" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    // Empty State
    if (receivedRequests.length === 0) return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="bg-base-200 rounded-full p-6">
                <Inbox size={40} className="text-base-content/30" />
            </div>
            <h3 className="text-lg font-semibold text-base-content/50">No Received Requests</h3>
            <p className="text-sm text-base-content/40">
                When someone sends you a request, it will appear here.
            </p>
        </div>
    );

    return (
        <div className="flex flex-col gap-4 p-4">

            {/* Count */}
            <div className="text-center md:text-left text-sm text-base-content/50 font-medium">
                {receivedRequests.length} request{receivedRequests.length > 1 ? 's' : ''} received
            </div>

            {receivedRequests.map((req) => (
                <div
                    key={req._id}
                    className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow duration-200"
                    onClick={() => navigate(`/profile/${req.sender._id}`)}
                >
                    <div className="card-body p-3 md:p-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">

                            {/* Avatar */}
                            <div className="avatar placeholder">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-secondary/10 text-secondary font-bold text-xl flex items-center justify-center overflow-hidden">
                                    {req.sender.profilePic ? (
                                        <img src={req.sender.profilePic} alt={req.sender.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span>{req.sender.name?.charAt(0).toUpperCase()}</span>
                                    )}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className=" ml-2 md:ml-0 font-bold text-base-content text-base">
                                    {req.sender.name}
                                </h3>
                                <p className="text-sm text-base-content/50 mt-0.5 break-words">
                                    {req.sender.college} • Btech {req.sender.department}
                                </p>

                                <div className="flex flex-col gap-2">
                                    {/* Teach Skills */}
                                    {req.sender.teachSkills?.length > 0 && (
                                        <div className="flex flex-1 flex-wrap gap-1 mt-2">
                                            <span className="text-xs text-base-content/40 mr-1 self-center">
                                                Teaches:
                                            </span>
                                            {req.sender.teachSkills.slice(0, 3).map((skill, i) => (
                                                <div key={i} className="badge badge-primary badge-outline badge-sm">
                                                    {skill}
                                                </div>
                                            ))}
                                            {req.sender.teachSkills.length > 3 && (
                                                <div className="badge badge-ghost badge-sm">
                                                    +{req.sender.teachSkills.length - 3}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Learn Skills */}
                                    {req.sender.learnSkills?.length > 0 && (
                                        <div className="flex flex-1 flex-wrap gap-1 mt-1">
                                            <span className="text-xs text-base-content/40 mr-1 self-center">
                                                Wants to learn:
                                            </span>
                                            {req.sender.learnSkills.slice(0, 3).map((skill, i) => (
                                                <div key={i} className="badge badge-success badge-outline badge-sm">
                                                    {skill}
                                                </div>
                                            ))}
                                            {req.sender.learnSkills.length > 3 && (
                                                <div className="badge badge-ghost badge-sm">
                                                    +{req.sender.learnSkills.length - 3}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                            </div>

                            {/* Right — action buttons or status + date */}
                            <div className="flex flex-col md:items-end items-start gap-2 w-full md:w-auto shrink-0">

                                {req.status === 'pending' ? (
                                    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                                        <button
                                            className="btn btn-success btn-sm gap-1"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAction(req._id, 'accepted')
                                            }}
                                        >
                                            <CheckCircle size={14} /> Accept
                                        </button>
                                        <button
                                            className="btn btn-error btn-outline btn-sm gap-1"
                                            onClick={(e) => {
                                                e.stopPropagation(); // ← prevents card click
                                                handleAction(req._id, 'rejected');
                                            }}
                                        >
                                            <XCircle size={14} /> Reject
                                        </button>
                                    </div>
                                ) : (
                                    <div className={`badge p-3 gap-1 ${req.status === 'accepted' ? 'badge-success' : 'badge-error'
                                        }`}>
                                        {req.status === 'accepted'
                                            ? <><CheckCircle size={12} /> Accepted</>
                                            : <><XCircle size={12} /> Rejected</>
                                        }
                                    </div>
                                )}

                                <span className="text-xs text-base-content/40">
                                    {new Date(req.createdAt).toLocaleDateString('en-IN', {
                                        day: 'numeric', month: 'short', year: 'numeric'
                                    })}
                                </span>

                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReceivedRequest;