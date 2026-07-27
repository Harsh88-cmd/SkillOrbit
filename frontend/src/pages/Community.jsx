import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ThemeToggle from "../components/ThemeToggle";
import CommunityModal from "../components/CommunityModal";
import GetCommunity from "../components/GetCommunity";
import { axiosInstance } from "../api/axios";

const Community = () => {
  const [communityModal, setCommunityModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get("/community/getPost");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="h-screen flex bg-base-200 overflow-hidden">
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 flex flex-col lg:ml-64 pt-16 lg:pt-0">

        {/* Navbar */}
        <div className="h-20 bg-base-100 border-b border-base-300 shadow-sm px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Community</h1>
          <ThemeToggle />
        </div>

        {/* Body */}
        <div className="flex-1 grid lg:grid-cols-[7fr_3fr] gap-6 p-6 overflow-hidden">

          {/* Left Side */}
          <div className="flex flex-col min-h-0">

            {/* Header */}
            <div className="flex sm:justify-between items-center mb-5 flex-col gap-2 sm:flex-row">
              <span className="font-semibold text-lg">
                Ask questions, share knowledge, and help others grow.
              </span>

              <button
                className="btn btn-primary"
                onClick={() => {
                  setEditingPost(null);      // Create mode
                  setCommunityModal(true);
                }}
              >
                + New Post
              </button>
            </div>

            {/* Posts */}
            <div className="flex-1 overflow-y-auto">
              <GetCommunity
                posts={posts}
                setPosts={setPosts}
                setEditingPost={setEditingPost}
                setCommunityModal={setCommunityModal}
              />
            </div>

            {/* Modal */}
            {communityModal && (
              <CommunityModal
                onClose={() => {
                  setCommunityModal(false);
                  setEditingPost(null);
                }}
                fetchPosts={fetchPosts}
                editingPost={editingPost}
              />
            )}
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-5 overflow-y-auto hidden lg:block">

            {/* Rules */}
            <div className="bg-base-100 border border-base-300 rounded-xl shadow-md p-5">

              <h2 className="text-xl font-bold mb-5">
                🤝 Community Rules
              </h2>

              <div className="space-y-4">

                <div className="flex gap-3">
                  <div className="badge badge-primary badge-sm mt-2"></div>
                  <p><b>Be Respectful:</b> Treat everyone kindly.</p>
                </div>

                <div className="flex gap-3">
                  <div className="badge badge-primary badge-sm mt-2"></div>
                  <p><b>Stay on Topic:</b> Keep discussions relevant.</p>
                </div>

                <div className="flex gap-3">
                  <div className="badge badge-primary badge-sm mt-2"></div>
                  <p><b>No Hate Speech:</b> Harassment isn't allowed.</p>
                </div>

                <div className="flex gap-3">
                  <div className="badge badge-primary badge-sm mt-2"></div>
                  <p><b>No Spam:</b> Avoid advertisements.</p>
                </div>

                <div className="flex gap-3">
                  <div className="badge badge-primary badge-sm mt-2"></div>
                  <p><b>Protect Privacy:</b> Never share sensitive information.</p>
                </div>

                <div className="flex gap-3">
                  <div className="badge badge-primary badge-sm mt-2"></div>
                  <p><b>Report Issues:</b> Help keep the community safe.</p>
                </div>

              </div>

              <div className="alert alert-error mt-6">
                Breaking these rules may result in suspension or permanent ban.
              </div>

            </div>

            {/* Popular Tags */}
            <div className="bg-base-100 border border-base-300 rounded-xl shadow-md p-5">

              <h2 className="font-bold text-xl mb-4">
                Popular Tags
              </h2>

              <div className="flex flex-wrap gap-2">
                <div className="badge badge-outline">React</div>
                <div className="badge badge-outline">Java</div>
                <div className="badge badge-outline">DSA</div>
                <div className="badge badge-outline">MongoDB</div>
                <div className="badge badge-outline">Node.js</div>
                <div className="badge badge-outline">Express</div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Community;