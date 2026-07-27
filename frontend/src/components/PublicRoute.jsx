import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="loading loading-spinner loading-lg text-primary" />
            </div>
        );
    }

    // If already logged in → redirect to home
    if (user) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default PublicRoute;