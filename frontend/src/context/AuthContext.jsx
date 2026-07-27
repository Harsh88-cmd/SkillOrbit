import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { axiosInstance } from "../api/axios";
import toast from "react-hot-toast";

const AuthContext = createContext(null);
const BASE_URL = "http://localhost:3000"; // your backend URL

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const connectSocket = (currentUser) => {
    if (!currentUser) return;

    const newSocket = io(BASE_URL, {
      query: { userId: currentUser._id },
    });

    newSocket.connect();
    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });
  };

  const disconnectSocket = () => {
    setSocket((prev) => {
      if (prev?.connected) prev.disconnect();
      return null;
    });
    setOnlineUsers([]);
  };

  // ALWAYS fetch fresh user on refresh
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/auth/me", {
          withCredentials: true,
        });

        setUser(res.data);
        connectSocket(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // disconnect socket when the provider unmounts (app closes/refreshes)
    return () => disconnectSocket();
  }, []);

  const login = async (email, password) => {
    const res = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    setUser(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    connectSocket(res.data.user);

    return res.data;
  };

  const register = async (name, email, password, department) => {
    const res = await axiosInstance.post("/auth/register", {
      name,
      email,
      password,
      department,
    });

    setUser(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    connectSocket(res.data.user);

    return res.data;
  };

  const logout = async () => {
    await axiosInstance.post("/auth/logout");

    toast.success("logout successfully");

    setUser(null);
    localStorage.removeItem("user");
    disconnectSocket();
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, register, logout, loading, socket, onlineUsers}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}