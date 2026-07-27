import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export function useChat(selectedUserId) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { socket } = useAuth();

  // Fetch message history whenever the selected user changes
  useEffect(() => {
    if (!selectedUserId) return;

    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(`/messages/${selectedUserId}`);
        setMessages(res.data);
      } catch {
        toast.error("Failed to load messages");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [selectedUserId]);

  // Listen for real-time incoming messages via socket
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      if (message.senderId !== selectedUserId) return;
      setMessages((prev) => [...prev, message]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => socket.off("newMessage", handleNewMessage);
  }, [socket, selectedUserId]);

  // Send a message
  const sendMessage = async (text) => {
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUserId}`,
        { text }
      );
      setMessages((prev) => [...prev, res.data]);
    } catch {
      toast.error("Failed to send message");
    }
  };

  return { messages, sendMessage, isLoading };
}