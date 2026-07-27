import ProfileHeader from "../components/ProfileHeader";
import Sidebar from "../components/Sidebar";
import { useSkill } from "../context/useSkill";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import EditProfileModal from "../components/EditProfileModal";
import RatingBadge from "../components/RatingBadge";

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [openEdit, setOpenEdit] = useState(false);
  const { teachSkills, learnSkills, } = useSkill();

  return (
    <div className="h-screen flex overflow-hidden bg-base-200 transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 overflow-y-auto lg:ml-64 pt-16 lg:pt-0">

        {/* Profile Section */}
        <div className="p-8">

          {/* Header Card */}
          <div className="card bg-base-100 border border-base-300 shadow-md p-8">

            <div className="flex flex-col md:flex-row md:items-center gap-6">

              <ProfileHeader
                user={user}
                setUser={setUser}
                editable={true}
              />

              <div className="">
                <h1 className="text-2xl md:text-3xl font-bold text-base-content">
                  {user.name}
                </h1>

                <p className="text-base-content/70 font-medium mt-1">
                  {user.role || "No role set"}
                </p>

                <p className="text-base-content/70 font-medium mt-1">
                  {user.college}
                </p>

                <p className="text-primary font-medium mt-1">
                  Btech-{user.department}
                </p>
              </div>


              <div className="flex flex-col md:ml-auto md:w-auto mt-4 md:mt-0">
                <span className="text-base font-semibold pl-4">Rating</span>
                <div className="mt-0 pb-4 pl-2 pr-2 pt-2 bg-primary-content rounded-btn">
                  <p className="font-semibold text-warning">
                    <RatingBadge userId={user?._id} />
                  </p>
                </div>
                <button
                  onClick={() => setOpenEdit(true)}
                  className="btn btn-outline btn-primary text-lg mt-2">
                  Add
                </button>

              </div>

            </div>
          </div>

          {/* Details Card */}
          <div className="card bg-base-100 border border-base-300 shadow-md mt-6 p-6">

            {/* About */}
            <h1 className="text-2xl font-bold text-base-content mb-3">
              About Me
            </h1>

            <p className="border-b border-base-300 pb-5 text-base-content/80 font-medium leading-7">
              {user.bio || "No bio added yet"}
            </p>

            {/* Teach Skills */}
            <div className="mt-6">
              <h2 className="font-bold text-xl text-primary mb-4">
                Skills I Can Teach
              </h2>

              <div className="flex flex-wrap gap-3">
                {teachSkills?.length >
                  0 ? (
                  teachSkills.map((skill, index) => (
                    <div key={index} className="badge badge-primary badge-outline p-4 text-sm font-semibold">
                      {skill}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-base-content/50">
                    No skills added
                  </p>
                )}
              </div>
            </div>

            {/* Learn Skills */}
            <div className="mt-8">
              <h2 className="font-bold text-xl text-accent mb-4">
                Skills I Want To Learn
              </h2>

              <div className="flex flex-wrap gap-3">
                {learnSkills?.length >
                  0 ? (
                  learnSkills.map((skill, index) => (
                    <div key={index} className="badge badge-accent badge-outline p-4 text-sm font-semibold">
                      {skill}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-base-content/50">
                    No skills added
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
      <EditProfileModal
        open={openEdit}
        setOpen={setOpenEdit}
        user={user}
        setUser={setUser}
      />

    </div>
  );
};

export default ProfilePage;