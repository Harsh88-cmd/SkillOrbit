import Message from "../models/Message.model.js";
import User from "../models/User.js";
import { getReceiverSocketId, getIO } from "../lib/socket.js";

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const newMessage = new Message({ senderId, receiverId, text });
    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      const io = getIO();          // ← get the instance here
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getConversations = async (req, res) => {
  try {
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [{ senderId: myId }, { receiverId: myId }],
    }).sort({ createdAt: -1 });

    const seen = new Set();
    const otherUserIds = [];

    for (const msg of messages) {
      const otherId =
        msg.senderId.toString() === myId.toString()
          ? msg.receiverId.toString()
          : msg.senderId.toString();

      if (!seen.has(otherId)) {
        seen.add(otherId);
        otherUserIds.push(otherId);
      }
    }

    const users = await User.find({ _id: { $in: otherUserIds } }).select("-password");
    const ordered = otherUserIds
      .map((id) => users.find((u) => u._id.toString() === id))
      .filter(Boolean);

    res.status(200).json(ordered);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};