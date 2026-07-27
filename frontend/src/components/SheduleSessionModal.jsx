import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { axiosInstance } from '../api/axios';
import toast from 'react-hot-toast';

const ScheduleSessionModal = ({ otherUserId, onClose }) => {
    const { user } = useAuth();
    const [topic, setTopic] = useState('');
    const [sessionDate, setSessionDate] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('');
    const [mode, setMode] = useState('online');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        // Validation
        if (!topic || !sessionDate || !time || !duration) {
            toast.error('All fields are required');
            return;
        }

        // Combine date and time into one Date object
        const combinedDateTime = new Date(`${sessionDate}T${time}`);

        // Check if date is in the past
        if (combinedDateTime < new Date()) {
            toast.error('Session date cannot be in the past');
            return;
        }

        setLoading(true);
        try {
            await axiosInstance.post('/sessions/create', {
                topic,
                sessionDate: combinedDateTime,
                duration: Number(duration),
                mode,
                scheduledBy: user._id,
                otherUserId,
            });
            toast.success('Session scheduled successfully!');
            onClose();

        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to schedule session');
        } finally {
            setLoading(false);
        }
    };

    return (
        <dialog className="modal modal-open">
            <div className="modal-box flex flex-col gap-3">
                <h3 className="font-bold text-lg">Schedule Session</h3>

                {/* Topic */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Topic</span>
                    </div>
                    <input
                        type="text"
                        placeholder="e.g. Learn React Hooks"
                        className="input input-bordered w-full"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                </label>

                {/* Date and Time side by side */}
                <div className="flex gap-3">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Session Date</span>
                        </div>
                        <input
                            type="date"
                            className="input input-bordered w-full"
                            value={sessionDate}
                            onChange={(e) => setSessionDate(e.target.value)}
                        />
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Time</span>
                        </div>
                        <input
                            type="time"
                            className="input input-bordered w-full"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </label>
                </div>

                {/* Duration and Mode side by side */}
                <div className="flex gap-3">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Duration (minutes)</span>
                        </div>
                        <input
                            type="number"
                            placeholder="e.g. 60"
                            className="input input-bordered w-full"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            min={15}
                            max={180}
                        />
                    </label>

                    {/* Mode */}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Mode</span>
                        </div>
                        <select
                            className="select select-bordered w-full"
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                        >
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                        </select>
                    </label>
                </div>

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
                            : 'Schedule'
                        }
                    </button>
                    
                </div>
            </div>
            <div className="modal-backdrop" onClick={onClose} />
        </dialog>
    );
};

export default ScheduleSessionModal;