import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { axiosInstance } from "../api/axios";
import toast from "react-hot-toast";
import { useSkill } from "../context/useSkill";
import ThemeToggle from "../components/ThemeToggle";
import ProgressBar from "../components/ProgressBar";

const MySkills = () => {
  const [teachSkill, setTeachSkill] = useState("");
  const [learnSkill, setLearnSkill] = useState("");

  const {
    teachSkills,
    setTeachSkills,
    learnSkills,
    setLearnSkills,
  } = useSkill();

  // Add Teach Skill
  const handleAddTeachSkill = async (e) => {
    e.preventDefault();

    if (!teachSkill.trim()) return;

    try {
      const res = await axiosInstance.post(
        "/skills/teach",
        {
          skill: teachSkill,
        }
      );

      setTeachSkills(
        res.data.userSkills.teachSkills
      );

      setTeachSkill("");

      toast.success("Skill added");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Something went wrong"
      );

      console.log(err);
    }
  };

  // Add Learn Skill
  const handleAddLearnSkill = async (e) => {
    e.preventDefault();

    if (!learnSkill.trim()) return;

    try {
      const res = await axiosInstance.post(
        "/skills/learn",
        {
          skill: learnSkill,
        }
      );

      setLearnSkills(
        res.data.userSkills.learnSkills
      );

      setLearnSkill("");

      toast.success("Skill added");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Something went wrong"
      );

      console.log(err);
    }
  };

  // Delete Teach Skill
  const deleteTeachSkill = async (
    skill
  ) => {
    try {
      const res =
        await axiosInstance.delete(
          "/skills/teach",
          {
            data: { skill },
          }
        );

      setTeachSkills(
        res.data.teachSkills
      );

      toast.success(
        "Skill deleted"
      );
    } catch (err) {
      toast.error(
        err.response?.data
          ?.message ||
          "Something went wrong"
      );

      console.log(err);
    }
  };

  // Delete Learn Skill
  const deleteLearnSkill = async (
    skill
  ) => {
    try {
      const res =
        await axiosInstance.delete(
          "/skills/learn",
          {
            data: { skill },
          }
        );

      setLearnSkills(
        res.data.learnSkills
      );

      toast.success(
        "Skill deleted"
      );
    } catch (err) {
      toast.error(
        err.response?.data
          ?.message ||
          "Something went wrong"
      );

      console.log(err);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-base-200 transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64 pt-16 lg:pt-0">

        {/* Navbar */}
        <div className="bg-base-100 border-b border-base-300 p-5 shadow-sm flex justify-between items-center">
          <h1 className="text-2xl font-bold text-base-content">
            My Skills
          </h1>

          <ThemeToggle />
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row flex-1 p-4 sm:p-6 lg:p-8 gap-6 overflow-auto">

          {/* Left Side */}
          <div className="w-full lg:w-[60%] flex flex-col gap-6">

            {/* Teach Skills Card */}
            <div className="card bg-base-100 border border-base-300 shadow-md hover:shadow-xl transition-all duration-300 min-h-[280px] lg:h-[280px] overflow-hidden shrink-0">

              <div className="card-body h-full">
                <div className="flex flex-col md:flex-row gap-6 h-full">

                  {/* Skills List */}
                  <div className="w-full md:w-[55%] flex flex-col h-full min-h-0">
                    <h2 className="text-xl font-bold text-primary mb-4 shrink-0">
                      Skills I can Teach
                    </h2>

                    {/* Scrollable Area */}
                    <div className="flex-1 overflow-y-auto pr-2">
                      {teachSkills.length === 0 ? (
                        <p className="text-base-content/60">
                          No skills added yet
                        </p>
                      ) : (
                        teachSkills.map(
                          (
                            skill,
                            index
                          ) => (
                            <div
                              key={
                                index
                              }
                              className="bg-primary/10 border border-primary/20 p-3 rounded-xl mb-3 flex justify-between items-center"
                            >
                              <span className="font-medium text-base-content">
                                {
                                  skill
                                }
                              </span>

                              <button
                                onClick={() =>
                                  deleteTeachSkill(
                                    skill
                                  )
                                }
                                className="btn btn-primary btn-sm"
                              >
                                Delete
                              </button>
                            </div>
                          )
                        )
                      )}
                    </div>
                  </div>

                  {/* Add Skill */}
                  <div className="md:w-[40%]">
                    <h3 className="font-semibold mb-3 text-base-content">
                      Add Skill
                    </h3>

                    <input
                      type="text"
                      placeholder="Enter skill"
                      value={
                        teachSkill
                      }
                      onChange={(
                        e
                      ) =>
                        setTeachSkill(
                          e.target
                            .value
                        )
                      }
                      className="input input-bordered w-full mb-4"
                    />

                    <button
                      onClick={
                        handleAddTeachSkill
                      }
                      className="btn btn-primary w-full"
                    >
                      Add Skill
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Learn Skills Card */}
            <div className="card bg-base-100 border border-base-300 shadow-md hover:shadow-xl transition-all duration-300 min-h-[280px] lg:h-[280px] overflow-hidden shrink-0">

              <div className="card-body h-full">
                <div className="flex flex-col md:flex-row gap-6 h-full">

                  {/* Skills List */}
                  <div className="w-full md:w-[55%]flex flex-col h-full min-h-0">
                    <h2 className="text-xl font-bold text-primary mb-4 shrink-0">
                      Skills I want to Learn
                    </h2>

                    {/* Scrollable Area */}
                    <div className="flex-1 overflow-y-auto pr-2">
                      {learnSkills.length === 0 ? (
                        <p className="text-base-content/60">
                          No skills added yet
                        </p>
                      ) : (
                        learnSkills.map(
                          (
                            skill,
                            index
                          ) => (
                            <div
                              key={
                                index
                              }
                              className="bg-accent-content/10 border border-accent/20 p-3 rounded-xl mb-3 flex justify-between items-center"
                            >
                              <span className="font-medium text-base-content">
                                {
                                  skill
                                }
                              </span>

                              <button
                                onClick={() =>
                                  deleteLearnSkill(
                                    skill
                                  )
                                }
                                className="btn btn-accent btn-sm"
                              >
                                Delete
                              </button>
                            </div>
                          )
                        )
                      )}
                    </div>
                  </div>

                  {/* Add Skill */}
                  <div className="md:w-[40%]">
                    <h3 className="font-semibold mb-3 text-base-content">
                      Add Skill
                    </h3>

                    <input
                      type="text"
                      placeholder="Enter skill"
                      value={
                        learnSkill
                      }
                      onChange={(
                        e
                      ) =>
                        setLearnSkill(
                          e.target
                            .value
                        )
                      }
                      className="input input-bordered w-full mb-4"
                    />

                    <button
                      onClick={
                        handleAddLearnSkill
                      }
                      className="btn btn-accent w-full"
                    >
                      Add Skill
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className=" hidden lg:flex w-[40%] justify-center items-center">
            <ProgressBar/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySkills;