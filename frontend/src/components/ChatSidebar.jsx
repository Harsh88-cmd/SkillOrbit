import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";
import { useAuth } from "../context/AuthContext";

const ChatSidebar = ({ selectedUser, setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user: authUser, onlineUsers } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/messages/conversations");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to load conversations", err);
      } finally {
        setLoading(false);
      }
    };

    if (authUser) {
      fetchUsers();
    }
  }, [authUser]);

  return (
    <aside className="w-full md:w-80 h-full flex flex-col bg-base-100 md:border-r border-base-300 min-h-0">
      {/* Header — matches Dashboard's h-16 header pattern */}
      <div className="h-16 flex items-center px-5 border-b border-base-300 shadow-sm shrink-0">
        <h2 className="text-xl font-bold text-base-content">Messages</h2>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <span className="loading loading-spinner loading-md text-primary"></span>
        </div>
      )}

      {/* Empty State */}
      {!loading && users.length === 0 && (
        <div className="flex-1 flex items-center justify-center text-base-content/50 text-sm px-4 text-center">
          No conversations yet
        </div>
      )}

      {/* Conversation List */}
      {!loading && users.length > 0 && (
        <div className="flex-1 overflow-y-auto min-h-0 py-2">
          {users.map((user) => {
            const isSelected = selectedUser?._id === user._id;
            const isOnline = onlineUsers.includes(user._id);

            return (
              <button
                key={user._id}
                type="button"
                onClick={() => setSelectedUser(user)}
                className={`w-full flex items-center gap-3 px-4 py-3 mx-2 my-0.5 rounded-xl transition-all duration-300 ${
                  isSelected
                    ? "bg-primary text-primary-content shadow-md"
                    : "text-base-content hover:bg-base-200"
                }`}
                style={{ width: "calc(100% - 1rem)" }}
              >
                <div className="relative shrink-0">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-base-100"
                  />
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-success border-2 border-base-100" />
                  )}
                </div>

                <div className="flex-1 text-left min-w-0">
                  <p className="font-semibold truncate">{user.name}</p>
                  <p
                    className={`text-sm truncate ${
                      isSelected ? "text-primary-content/70" : "text-base-content/60"
                    }`}
                  >
                    {isOnline ? "Online" : "Offline"}
                  </p>
                </div>

                {isOnline && !isSelected && (
                  <span className="badge badge-success badge-xs shrink-0"></span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </aside>
  );
};

export default ChatSidebar;