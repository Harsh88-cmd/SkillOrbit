import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { SkillProvider } from "./context/SkillContext";
import { ThemeProvider } from "./context/ThemeContext";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SearchStudent from "./pages/SearchStudent";
import MySkills from "./pages/MySkills";
import ProfilePage from "./pages/ProfilePage";
import OtherUserProfile from "./pages/OtherUserProfile";
import Request from "./pages/Request";
import Session from "./pages/Session";
import Messages from "./pages/Messages";
import ReviewPage from "./pages/ReviewPage";
import Community from "./pages/Community";

import CommentShow from "./components/CommentShow";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const AppContent = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />

      <div className="min-h-screen bg-base-100 text-base-content">
        <Routes>

          {/* Public Routes */}

          <Route
            path="/"
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/search-students"
            element={
              <ProtectedRoute>
                <SearchStudent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-skills"
            element={
              <ProtectedRoute>
                <MySkills />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-request"
            element={
              <ProtectedRoute>
                <Request />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-sessions"
            element={
              <ProtectedRoute>
                <Session />
              </ProtectedRoute>
            }
          />

          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reviews"
            element={
              <ProtectedRoute>
                <ReviewPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            }
          />

          <Route
            path="/community/:postId"
            element={
              <ProtectedRoute>
                <CommentShow />
              </ProtectedRoute>
            }
          />

          {/* Route without Sidebar */}

          <Route
            path="/profile/:userId"
            element={<OtherUserProfile />}
          />

        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SkillProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </SkillProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;