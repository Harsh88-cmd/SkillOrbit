import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useChat } from "../hooks/useChat";
import { useAuth } from "../context/AuthContext";

const ChatWindow = ({ selectedUser, onBack }) => {
  const { messages, sendMessage, isLoading } = useChat(selectedUser._id);
  const { user: authUser, onlineUsers } = useAuth();

  const [text, setText] = useState("");
  const endRef = useRef(null);

  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
  };

  return (
    <div className="flex h-full flex-col min-h-0">
      {/* Header — matches Dashboard's h-16 header pattern */}
      <div className="h-16 flex items-center gap-3 px-3 border-b border-base-300 shadow-sm shrink-0">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="md:hidden btn btn-ghost btn-circle btn-sm shrink-0"
            aria-label="Back to conversations"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        <div className="relative shrink-0">
          <img
            src={selectedUser.profilePic || "/avatar.png"}
            alt={selectedUser.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-base-100"
          />
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-success border-2 border-base-100" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-base-content truncate">{selectedUser.name}</p>
          <p className={`text-xs ${isOnline ? "text-success" : "text-base-content/50"}`}>
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-base-200 p-3 md:p-4 min-h-0">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : messages.length === 0 ? (
          <div className="mt-20 text-center text-base-content/50">
            No messages yet 👋
          </div>
        ) : (
          messages.map((msg) => {
            const isMine = msg.senderId === authUser._id;
            return (
              <div key={msg._id} className={`chat ${isMine ? "chat-end" : "chat-start"}`}>
                <div
                  className={`chat-bubble max-w-[85%] sm:max-w-[80%] break-words shadow-sm ${
                    isMine
                      ? "chat-bubble-primary"
                      : "bg-base-100 border border-base-300 text-base-content"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="border-t border-base-300 bg-base-100 p-3 shrink-0"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="input input-bordered input-sm md:input-md flex-1 focus:outline-primary"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="btn btn-primary btn-sm md:btn-md"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;