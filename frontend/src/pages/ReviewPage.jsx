import Sidebar from "../components/Sidebar";
import ThemeToggle from "../components/ThemeToggle";
import ReviewList from "../components/ReviewList";
import { useAuth } from "../context/AuthContext";

const ReviewPage = () => {
    const { user } = useAuth();

    return (
        <div className="h-screen flex overflow-hidden bg-base-200 transition-colors duration-300">
            <Sidebar />
            <div className="flex-1 overflow-y-auto lg:ml-64 pt-16 lg:pt-0">

                {/* Navbar */}
                <div className="bg-base-100 border-b border-base-300 p-5 shadow-sm flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-base-content">
                        Reviews and Rating
                    </h1>
                    <ThemeToggle />
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="card bg-base-100 border border-base-300 shadow-md p-6">
                        {user?._id && <ReviewList userId={user._id} showDeleteButton={false}/>}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReviewPage;