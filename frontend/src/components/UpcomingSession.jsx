// components/UpcomingSession.jsx
import { useEffect, useState } from 'react';
import { axiosInstance } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Clock,Send } from "lucide-react";
import toast from 'react-hot-toast';

const UpcomingSession = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const res = await axiosInstance.get('/sessions/upcoming');
                setSessions(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSessions();
    }, []);

    const handleDelete = async (sessionId) => {
    try {
        await axiosInstance.delete(`/sessions/delete/${sessionId}`);
        setSessions(prev => prev.filter(s => s._id !== sessionId));
        toast.success('Session deleted');
    } catch (error) {
        toast.error('Failed to delete session');
    }
};

    // handle loading state
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

    // handle empty state
    if (sessions.length === 0) return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="bg-base-200 rounded-full p-6">
                <Send size={40} className="text-base-content/30" />
            </div>
            <h3 className="text-lg font-semibold text-base-content/50">No upcoming Session</h3>
            <p className="text-sm text-base-content/40">
                Create your first session to enjoy the learning and teaching process
            </p>
        </div>
    );

    // map over sessions and show cards

    return (
    <div className="flex flex-col gap-4 p-4">

        <div className="text-sm text-base-content/50 font-medium">
            {sessions.length} Upcoming session{sessions.length > 1 ? 's' : ''}
        </div>

        {sessions.map((session) => {
            const otherParticipant = session.participants.find(p => p._id !== user._id);
            const isScheduledByMe = session.scheduledBy._id === user._id;

            return (
                <div key={session._id}
                    className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                    <div className="card-body p-4 flex flex-col gap-3">

                        {/* Top — avatar + name + status badge */}
                        <div className="flex items-center gap-3">
                            <div className="avatar placeholder">
                                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-xl flex items-center justify-center overflow-hidden">
                                    {otherParticipant?.profilePic ? (
                                        <img src={otherParticipant.profilePic} alt={otherParticipant.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span>{otherParticipant?.name?.charAt(0).toUpperCase()}</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1">
                                <p className="font-bold text-base-content">{otherParticipant?.name}</p>
                                <p className="text-sm text-base-content/50">{otherParticipant?.college} • {otherParticipant?.department}</p>
                                <p className="text-xs text-base-content/40 mt-0.5">
                                    Scheduled by {isScheduledByMe ? 'You' : session.scheduledBy.name}
                                </p>
                            </div>

                            {/* Status badge */}
                            <span className={`badge p-3 ${session.status === 'confirmed' ? 'badge-success' : 'badge-warning'}`}>
                                {session.status}
                            </span>
                        </div>

                        {/* Topic */}
                        <div className="bg-base-200 rounded-lg p-3">
                            <p className="text-xs text-base-content/40">Topic</p>
                            <p className="font-semibold text-base-content mt-0.5">{session.topic}</p>
                        </div>

                        {/* Meta — date, duration, mode */}
                        <div className="flex gap-4 flex-wrap text-sm text-base-content/60">
                            <span className="flex items-center gap-1">
                                <Clock size={14} />
                                {new Date(session.sessionDate).toLocaleDateString('en-IN', {
                                    day: 'numeric', month: 'short', year: 'numeric'
                                })}
                                {' '}
                                {new Date(session.sessionDate).toLocaleTimeString('en-IN', {
                                    hour: '2-digit', minute: '2-digit'
                                })}
                            </span>
                            <span>⏱ {session.duration} min</span>
                            <span>📍 {session.mode}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-1">
                            <button
                                className="btn btn-primary btn-sm flex-1 gap-1"
                                onClick={() => window.open(`https://meet.jit.si/skillxchange-${session._id}`, '_blank')}
                            >
                                Join Session
                            </button>

                            {isScheduledByMe ? (
                                <button
                                    className="btn btn-error btn-outline btn-sm"
                                    onClick={() => handleDelete(session._id)}
                                >
                                    Delete
                                </button>
                            ) : (
                                <button className="btn btn-outline btn-sm">
                                    Leave
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            );
        })}
    </div>
);

};

export default UpcomingSession;