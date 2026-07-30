import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";
import { useAuth} from "../context/AuthContext";
import { Clock, CheckCircle, XCircle,Calendar,Search , UserCheck } from "lucide-react";
import ScheduleSessionModal from "./SheduleSessionModal";
import { useNavigate } from "react-router-dom";

const SentRequest = () => {
    const [sentRequests, setSentRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user: authUser } = useAuth();
    const [scheduleModalUserId, setScheduleModalUserId] = useState(null);
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchSentRequests = async () => {
            try {
                const res = await axiosInstance.get('/requests/sent');
                setSentRequests(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSentRequests();
    }, []);

    const handleCancel = async (requestId) => {
        try {
            await axiosInstance.delete(`/requests/delete/${requestId}`);
            setSentRequests(prev => prev.filter(r => r._id !== requestId));
        } catch (error) {
            console.log(error);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return (
                    <div className="badge badge-warning gap-1 p-3">
                        <Clock size={12} /> Pending
                    </div>
                );
            case 'accepted':
                return (
                    <div className="badge badge-success gap-1 p-3">
                        <CheckCircle size={12} /> Accepted
                    </div>
                );
            case 'rejected':
                return (
                    <div className="badge badge-error gap-1 p-3">
                        <XCircle size={12} /> Rejected
                    </div>
                );
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
                        <div className="skeleton h-6 w-20 rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    );

    // Empty State
    if (sentRequests.length === 0) return (
        <section className="mb-8">
              <div className="card bg-primary/10 border border-primary/30 shadow-md relative">

                <div className="card-body">
                  <h3 className="card-title text-primary">
                    New here? Here's how you can sent you first request 
                  </h3>
                  <p className="text-base-content/70 text-sm mb-4">
                    Follow these steps to start learning and teaching skills with other students.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary text-primary-content shrink-0">
                        <Search size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">1. Search Students</p>
                        <p className="text-xs text-base-content/60">
                          Find people teaching a skill you want to learn.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary text-primary-content shrink-0">
                        <UserCheck size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">2. Send a Request</p>
                        <p className="text-xs text-base-content/60">
                          Visit their profile and request a session.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary text-primary-content shrink-0">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">3. Start Learning</p>
                        <p className="text-xs text-base-content/60">
                          Once accepted, join or schedule a session.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/search-students")}
                    className="btn btn-primary mt-4 w-full sm:w-fit"
                  >
                    Search Students to Get Started
                  </button>
                </div>
              </div>
            </section>
    );

    return (
        <div className="flex flex-col gap-4 p-4">

            {/* Count */}
            <div className="text-center md:text-left text-sm text-base-content/50 font-medium">
                {sentRequests.length} request{sentRequests.length > 1 ? 's' : ''} sent
            </div>

            {sentRequests.map((req) => (
                <div
                    key={req._id}
                    className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                    <div className="card-body p-3 md:p-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">

                            {/* Avatar */}
                            <div className="avatar placeholder">
                                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary font-bold text-xl flex items-center justify-center overflow-hidden">
                                    {req.receiver.profilePic ? (
                                        <img src={req.receiver.profilePic} alt={req.receiver.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span>{req.receiver.name?.charAt(0).toUpperCase()}</span>
                                    )}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="ml-2 md:ml-0 font-bold text-base-content text-base">
                                    {req.receiver.name}
                                </h3>
                                <p className="text-sm text-base-content/50 mt-0.5 break-words">
                                    {req.receiver.college} • BTech {req.receiver.department}
                                </p>

                                {/* Teach Skills */}
                                {req.receiver.teachSkills?.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        <span className="text-xs text-base-content/40 mr-1 self-center">
                                            Teaches:
                                        </span>
                                        {req.receiver.teachSkills.slice(0, 3).map((skill, i) => (
                                            <div key={i} className="badge badge-primary badge-outline badge-sm">
                                                {skill}
                                            </div>
                                        ))}
                                        {req.receiver.teachSkills.length > 3 && (
                                            <div className="badge badge-ghost badge-sm">
                                                +{req.receiver.teachSkills.length - 3}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Learn Skills */}
                                {req.receiver.learnSkills?.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        <span className="text-xs text-base-content/40 mr-1 self-center">
                                            Wants to learn:
                                        </span>
                                        {req.receiver.learnSkills.slice(0, 3).map((skill, i) => (
                                            <div key={i} className="badge badge-success badge-outline badge-sm">
                                                {skill}
                                            </div>
                                        ))}
                                        {req.receiver.learnSkills.length > 3 && (
                                            <div className="badge badge-ghost badge-sm">
                                                +{req.receiver.learnSkills.length - 3}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Right — status + date + cancel/schedule */}
                            <div className="flex flex-col md:items-end items-start gap-2 w-full md:w-auto shrink-0">
                                {getStatusBadge(req.status)}

                                <span className="text-xs text-base-content/40">
                                    {new Date(req.createdAt).toLocaleDateString('en-IN', {
                                        day: 'numeric', month: 'short', year: 'numeric'
                                    })}
                                </span>

                                {req.status === 'pending' && (
                                    <button
                                        className="btn btn-error btn-outline btn-xs"
                                        onClick={() => handleCancel(req._id)}
                                    >
                                        Cancel
                                    </button>
                                )}

                                {req.status === 'accepted' && (
                                    <button
                                        className="btn btn-primary btn-sm gap-1"
                                        onClick={() => setScheduleModalUserId(req.receiver._id)}
                                    >
                                        <Calendar size={14} /> Schedule Session
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            ))}

            {scheduleModalUserId && (
                <ScheduleSessionModal
                    otherUserId={scheduleModalUserId}
                    onClose={() => setScheduleModalUserId(null)}
                />
            )}
        </div>
    );
};

export default SentRequest;