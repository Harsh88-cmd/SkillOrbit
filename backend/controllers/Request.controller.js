import Request from '../models/Request.js';
import Skill from '../models/skill.model.js';


// Send Request
export const sendRequest = async (req, res) => {
    try {
        const senderId = req.user.id;
        const { receiverId } = req.body;

        // Validation
        if (!receiverId) {
            return res.status(400).json({ message: 'receiverId is required' });
        }

        // Can't send request to yourself
        if (senderId === receiverId) {
            return res.status(400).json({ message: 'You cannot send a request to yourself' });
        }

        // Check duplicate
        const existing = await Request.findOne({ sender: senderId, receiver: receiverId });
        if (existing) {
            return res.status(400).json({ message: 'Request already sent', status: existing.status });
        }

        const newRequest = new Request({ sender: senderId, receiver: receiverId });
        await newRequest.save();

        res.status(201).json({ success: true, message: 'Request sent successfully', request: newRequest });

    } catch (error) {
        console.error('sendRequest error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get Sent Requests
export const getSentRequests = async (req, res) => {
    try {
        const userId = req.user.id;

        const requests = await Request.find({ sender: userId })
            .populate('receiver', 'name email profilePic college department bio role')
            .sort({ createdAt: -1 });

        // Fetch skills separately for each receiver
        const requestsWithSkills = await Promise.all(
            requests.map(async (req) => {
                const skillData = await Skill.findOne({ userId: req.receiver._id });
                return {
                    ...req.toObject(),
                    receiver: {
                        ...req.receiver.toObject(),
                        teachSkills: skillData?.teachSkills || [],
                        learnSkills: skillData?.learnSkills || [],
                    }
                };
            })
        );

        res.status(200).json(requestsWithSkills);

    } catch (error) {
        console.error('getSentRequests error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get Received Requests
export const getReceivedRequests = async (req, res) => {
    try {
        const userId = req.user.id;

        const requests = await Request.find({ receiver: userId })
            .populate('sender', 'name email profilePic college department bio role')
            .sort({ createdAt: -1 });

        // Fetch skills separately for each sender
        const requestsWithSkills = await Promise.all(
            requests.map(async (req) => {
                const skillData = await Skill.findOne({ userId: req.sender._id });
                return {
                    ...req.toObject(),
                    sender: {
                        ...req.sender.toObject(),
                        teachSkills: skillData?.teachSkills || [],
                        learnSkills: skillData?.learnSkills || [],
                    }
                };
            })
        );

        res.status(200).json(requestsWithSkills);

    } catch (error) {
        console.error('getReceivedRequests error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Accept / Reject Request
export const updateRequestStatus = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { status } = req.body;
        const userId = req.user.id;

        // Validate status value
        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Status must be accepted or rejected' });
        }

        const request = await Request.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // Only the receiver can accept/reject the request
        if (request.receiver.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to update this request' });
        }

        // Can't update already accepted/rejected request
        if (request.status !== 'pending') {
            return res.status(400).json({ message: `Request already ${request.status}` });
        }

        request.status = status;
        await request.save();

        res.status(200).json({ success: true, message: `Request ${status}`, request });

    } catch (error) {
        console.error('updateRequestStatus error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//Delete
export const deleteRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const userId = req.user.id;

        const request = await Request.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // Only the sender or receiver can cancel/remove the request
        if (request.sender.toString() !== userId && request.receiver.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this request' });
        }

        // Only pending requests can be cancelled
        // if (request.status !== 'pending') {
        //     return res.status(400).json({ message: `Cannot cancel a request that is already ${request.status}` });
        // }

        await Request.findByIdAndDelete(requestId);

        res.status(200).json({ success: true, message: 'Request cancelled successfully' });

    } catch (error) {
        console.error('deleteRequest error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//Check Request Status between current user and another user
export const checkRequestStatus = async (req, res) => {
    try {
        const senderId = req.user.id;
        const { receiverId } = req.params;

        const request = await Request.findOne({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
            ]
        });

        if (!request) {
            return res.status(200).json({ exists: false, status: null });
        }

        res.status(200).json({ exists: true, status: request.status, requestId: request._id });

    } catch (error) {
        console.error('checkRequestStatus error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};