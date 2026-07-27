import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ThemeToggle from "../components/ThemeToggle";
import UpcomingSession from "../components/UpcomingSession";
import ReceivedRequest from "../components/ReceivedRequest";
import { useAuth } from "../context/AuthContext";
import { useSkill } from "../context/useSkill";
import { axiosInstance } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { LogOut, Search, UserCheck, Calendar, X } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { teachSkills, learnSkills } = useSkill();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  // NEW: real session counts (replacing hardcoded 3 / 12)
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get(`/reviews/user/${user._id}`);
        setReviews(res.data.reviews);
        setAverageRating(res.data.averageRating);
        setTotalReviews(res.data.totalReviews);
      } catch (error) {
        console.log(error);
      } finally {
        setReviewsLoading(false);
      }
    };
    if (user?._id) fetchReviews();
  }, [user]);

  // NEW: fetch real upcoming & completed session counts
  useEffect(() => {
    const fetchSessionCounts = async () => {
      try {
        const [upcomingRes, pastRes] = await Promise.all([
          axiosInstance.get(`/sessions/upcoming/${user._id}`),
          axiosInstance.get(`/sessions/past/${user._id}`),
        ]);

        setUpcomingCount(upcomingRes.data.length);
        const completed = pastRes.data.filter(
          (s) => s.status === "completed"
        );
        setCompletedCount(completed.length);
      } catch (error) {
        console.log(error);
      }
    };
    if (user?._id) fetchSessionCounts();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const dismissOnboarding = () => {
    setShowOnboarding(false);
  };

  // Show banner only for genuinely new users (no activity yet), unless already dismissed
  const isNewUser = completedCount === 0;

  return (
    <div className="h-screen bg-base-200 flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64 min-w-0 pt-16 lg:pt-0">
        {/* Header */}
        <header className="h-16 bg-base-100 border-b border-base-300 flex items-center justify-between px-6 shadow-sm flex-shrink-0">
          <h1 className="text-2xl font-bold text-base-content">Dashboard</h1>
          <div className="flex gap-4 items-center">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 p-3 rounded-lg text-error hover:bg-error hover:text-error-content transition duration-300 font-medium"
            >
              <LogOut size={20} />
              Logout
            </button>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Welcome */}
          <section className="mb-8">
            <h2 className="text-4xl font-bold text-base-content">
              Welcome back, {user?.name}
            </h2>
            <p className="text-base-content/70 mt-2 text-lg">
              The more you learn, the more you earn.
            </p>
          </section>

          {/* Onboarding Banner — helps new users understand the flow */}
          {showOnboarding && isNewUser && (
            <section className="mb-8">
              <div className="card bg-primary/10 border border-primary/30 shadow-md relative">

                <div className="card-body">
                  <h3 className="card-title text-primary">
                    New here? Here's how SkillOrbit works
                  </h3>
                  <p className="text-base-content/70 text-sm mb-4">
                    Follow these steps to start learning and teaching skills with other students.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary text-primary-content shrink-0">
                        <Search size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">1. Search Students</p>
                        <p className="text-xs text-base-content/60">
                          Find people teaching a skill you want to learn.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary text-primary-content shrink-0">
                        <UserCheck size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">2. Send a Request</p>
                        <p className="text-xs text-base-content/60">
                          Visit their profile and request a session.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary text-primary-content shrink-0">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">3. Start Learning</p>
                        <p className="text-xs text-base-content/60">
                          Once accepted, join or schedule a session.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/search-students")}
                    className="btn btn-primary mt-4 w-full sm:w-fit"
                  >
                    Search Students to Get Started
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Stats */}
          <section className="grid gap-6 lg:grid-cols-5 md:grid-cols-2 grid-cols-1">
            <div className="card bg-base-100 border border-base-300 shadow-md">
              <div className="card-body">
                <p className="text-base-content/70">Skills I Can Teach</p>
                <h2 className="text-4xl font-bold text-primary">
                  {teachSkills.length}
                </h2>
              </div>
            </div>

            <div className="card bg-base-100 border border-base-300 shadow-md">
              <div className="card-body">
                <p className="text-base-content/70">Skills I Want to Learn</p>
                <h2 className="text-4xl font-bold text-success">
                  {learnSkills.length}
                </h2>
              </div>
            </div>

            {/* CHANGED: was hardcoded "3" */}
            <div className="card bg-base-100 border border-base-300 shadow-md">
              <div className="card-body">
                <p className="text-base-content/70">Upcoming Sessions</p>
                <h2 className="text-4xl font-bold text-info">
                  {upcomingCount}
                </h2>
              </div>
            </div>

            {/* CHANGED: was hardcoded "12" */}
            <div className="card bg-base-100 border border-base-300 shadow-md">
              <div className="card-body">
                <p className="text-base-content/70">Completed Sessions</p>
                <h2 className="text-4xl font-bold text-secondary">
                  {completedCount}
                </h2>
              </div>
            </div>

            <div className="card bg-base-100 border border-base-300 shadow-md">
              <div className="card-body">
                <p className="text-base-content/70">Rating</p>
                <h2 className="text-4xl font-bold text-warning">
                  {totalReviews > 0 ? `${averageRating.toFixed(1)} ⭐` : "—"}
                </h2>
                {totalReviews > 0 && (
                  <p className="text-xs text-base-content/50">
                    {totalReviews} reviews
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* ======== Skills + Reviews ========= */}
          <section className="grid lg:grid-cols-3 gap-6 mt-8">
            {/* Teach Skills */}
            <div className="card bg-base-100 border border-base-300 shadow-md h-80">
              <div className="card-body">
                <h2 className="card-title text-primary">Skills I Can Teach</h2>
                <div className="flex flex-wrap gap-3 mt-4 overflow-y-auto">
                  {teachSkills.length > 0 ? (
                    teachSkills.map((skill, index) => (
                      <div key={index} className="badge badge-primary badge-outline p-4">
                        {skill}
                      </div>
                    ))
                  ) : (
                    <p className="text-base-content/50">No skills added</p>
                  )}
                </div>
              </div>
            </div>

            {/* Learn Skills */}
            <div className="card bg-base-100 border border-base-300 shadow-md h-80">
              <div className="card-body">
                <h2 className="card-title text-success">Skills I Want to Learn</h2>
                <div className="flex flex-wrap gap-3 mt-4 overflow-y-auto">
                  {learnSkills.length > 0 ? (
                    learnSkills.map((skill, index) => (
                      <div key={index} className="badge badge-success badge-outline p-4">
                        {skill}
                      </div>
                    ))
                  ) : (
                    <p className="text-base-content/50">No skills added</p>
                  )}
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="card bg-base-100 border border-base-300 shadow-md h-80">
              <div className="card-body overflow-hidden">
                <div className="flex justify-between items-center">
                  <h2 className="card-title text-warning">Reviews</h2>
                  {totalReviews > 0 && (
                    <button
                      onClick={() => navigate("/reviews")}
                      className="text-xs text-primary hover:underline"
                    >
                      View all
                    </button>
                  )}
                </div>

                <div className="space-y-4 mt-4 overflow-y-auto flex-1">
                  {reviewsLoading ? (
                    <div className="skeleton h-20 rounded-xl w-full" />
                  ) : reviews.length === 0 ? (
                    <p className="text-sm text-base-content/50">No reviews yet</p>
                  ) : (
                    reviews.map((review) => (
                      <div key={review._id} className="border border-base-300 rounded-xl p-3">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">{review.reviewer?.name}</h3>
                          <span className="text-warning">
                            {"⭐".repeat(review.rating)}
                          </span>
                        </div>
                        <p className="text-sm text-base-content/70 mt-2">
                          {review.comment}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ===== Sessions -----*/}
          <section className="grid lg:grid-cols-2 gap-6 mt-8 mb-10">
            <div className="card bg-base-100 border border-base-300 shadow-md h-96">
              <div className="card-body overflow-y-auto">
                <UpcomingSession />
              </div>
            </div>

            <div className="card bg-base-100 border border-base-300 shadow-md h-96">
              <div className="card-body md:h-52 overflow-y-auto">
                <ReceivedRequest />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;