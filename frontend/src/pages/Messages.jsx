import { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";
import ThemeToggle from "../components/ThemeToggle";

const Messages = () => {
  const location = useLocation();
  const [selectedUser, setSelectedUser] = useState(
    location.state?.selectedUser || null
  );

  return (
    <div className="h-screen flex flex-col bg-base-200 pt-16 lg:pt-0 lg:pl-64">
      <Sidebar />

      {/* Page header — desktop only */}
      <div className="hidden md:flex bg-base-100 border-b border-base-300 p-4 shadow-sm items-center gap-3 shrink-0">
        <h1 className="text-2xl font-bold text-base-content flex-1">Messages</h1>
        <ThemeToggle />
      </div>

      <div className="flex-1 min-h-0 mx-auto w-full max-w-[1600px] p-0 lg:p-4">
        <div className="bg-base-100 h-full lg:rounded-2xl lg:shadow-xl overflow-hidden">
          {/* Desktop */}
          <div className="hidden md:flex h-full">
            <ChatSidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            <div className="flex-1 min-w-0">
              {selectedUser ? (
                <ChatWindow selectedUser={selectedUser} />
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="text-7xl">💬</div>
                  <h2 className="mt-4 text-2xl font-bold">Messages</h2>
                  <p className="text-base-content/60 mt-2">
                    Select a conversation to start chatting.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden h-full">
            {!selectedUser ? (
              <ChatSidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            ) : (
              <ChatWindow selectedUser={selectedUser} onBack={() => setSelectedUser(null)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;