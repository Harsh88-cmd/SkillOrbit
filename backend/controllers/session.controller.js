import Session from "../models/session.model.js";
import Request from '../models/Request.js';

export const createSession = async (req, res) => {
    try {
        const scheduledBy = req.user.id;
        const { topic, sessionDate, duration, mode, otherUserId } = req.body;

        if (!topic || !sessionDate || !duration || !mode || !otherUserId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (scheduledBy === otherUserId) {
            return res.status(400).json({ message: 'You cannot schedule a session with yourself' });
        }

        const connection = await Request.findOne({
            $or: [
                { sender: scheduledBy, receiver: otherUserId },
                { sender: otherUserId, receiver: scheduledBy },
            ],
            status: 'accepted'
        });

        if (!connection) {
            return res.status(403).json({ message: 'You can only schedule sessions with connected users' });
        }

        const session = new Session({
            participants: [scheduledBy, otherUserId],
            topic,
            sessionDate,
            duration,
            mode,
            scheduledBy,
            status: 'pending',
        });

        await session.save();

        res.status(201).json({ success: true, message: 'Session scheduled successfully', session });

    } catch (error) {
        console.error('createSession error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getMySessions = async (req, res) => {
    try {
        const userId = req.user.id;

        const userSession = await Session.find({ participants: { $in: [userId] } })
            .populate('participants', 'name email profilePic department college')
            .populate('scheduledBy', 'name')
            .sort({ sessionDate: 1 });

        res.status(200).json({ success: true, userSession });

    } catch (error) {
        console.error('getMySessions error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUpcomingSessions = async (req, res) => {
    try {
        const userId = req.user.id;

        const sessions = await Session.find({
            participants: { $in: [userId] },
            sessionDate: { $gte: new Date() },
            status: { $in: ['pending', 'confirmed'] }
        })
            .populate('participants', 'name email profilePic department college')
            .populate('scheduledBy', 'name')
            .sort({ sessionDate: 1 });

        res.status(200).json(sessions);

    } catch (error) {
        console.error('getUpcomingSessions error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getPastSessions = async (req, res) => {
    try {
        const userId = req.user.id;

        const sessions = await Session.find({
            participants: { $in: [userId] },
            $or: [
                { sessionDate: { $lt: new Date() } },
                { status: { $in: ['completed', 'cancelled'] } }
            ]
        })
            .populate('participants', 'name email profilePic department college')
            .populate('scheduledBy', 'name')
            .sort({ sessionDate: -1 });

        res.status(200).json(sessions);

    } catch (error) {
        console.error('getPastSessions error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteSession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const userId = req.user.id;

        const session = await Session.findById(sessionId);

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        if (session.scheduledBy.toString() !== userId) {
            return res.status(403).json({ message: 'Only the session creator can delete this session' });
        }

        await Session.findByIdAndDelete(sessionId);

        res.status(200).json({ success: true, message: 'Session deleted successfully' });

    } catch (error) {
        console.error('deleteSession error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getLatestCompletedSession = async (req, res) => {
    try {
        const { otherUserId } = req.params;
        const userId = req.user.id;

        const session = await Session.findOne({
            participants: { $all: [userId, otherUserId] },
            status: "completed",
        }).sort({ sessionDate: -1 });

        if (!session) {
            return res.status(200).json({ sessionId: null });
        }

        return res.status(200).json({ sessionId: session._id });

    } catch (error) {
        console.error("Error fetching latest completed session:", error.message);
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};