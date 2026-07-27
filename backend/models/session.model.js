import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    ],
    topic: {
        type: String,
        required: true,
        trim: true,
    },
    sessionDate: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    mode: {
        type: String,
        enum: ['online', 'offline'],
        default: 'online', 
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending',
    },
    scheduledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema);
export default Session;