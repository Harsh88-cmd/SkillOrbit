import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { axiosInstance } from "../api/axios";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import RatingBadge from "../components/RatingBadge";

const SearchStudent = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment,] = useState("");
  const [selectedSkill, setSelectedSkill,] = useState("");

  // Fetch students
  useEffect(() => {
    const getStudents = async () => {
      try {
        const res =
          await axiosInstance.get(
            "/students/search"
          );
        setStudents(res.data);
        setFilteredStudents(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

    getStudents();
  }, []);

  // Filter Logic
  useEffect(() => {
    let filtered = students;

    // Search by Name
    if (search.trim()) {
      filtered = filtered.filter(
        (student) =>
          student.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }

    // Department Filter
    if (
      selectedDepartment
    ) {
      filtered =
        filtered.filter(
          (student) =>
            student.department ===
            selectedDepartment
        );
    }

    // Skill Filter
    if (
      selectedSkill.trim()
    ) {
      filtered =
        filtered.filter(
          (student) =>
            student.teachSkills.some(
              (skill) =>
                skill
                  .toLowerCase()
                  .includes(
                    selectedSkill.toLowerCase()
                  )
            )
        );
    }

    setFilteredStudents(
      filtered
    );
  }, [
    search,
    selectedDepartment,
    selectedSkill,
    students,
  ]);

  return (
    <div className="h-screen flex overflow-hidden bg-base-200 transition-colors duration-300">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto lg:ml-64 pt-16 lg:pt-0">

        {/* Navbar */}
        <div className="bg-base-100 border-b border-base-300 p-5 shadow-sm flex justify-between items-center">
          <h1 className="text-2xl font-bold text-base-content">
            Search Student
          </h1>

          <ThemeToggle />
        </div>


        {/* Filters */}
        <div className="p-6 flex flex-wrap gap-4">

          {/* Search Student */}
          <input
            type="text"
            placeholder="Search student..."
            className="input input-bordered w-64"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          {/* Department Dropdown */}
          <select
            className="select select-bordered w-52"
            value={
              selectedDepartment
            }
            onChange={(e) =>
              setSelectedDepartment(
                e.target.value
              )
            }
          >
            <option value="">
              All Departments
            </option>

            <option value="CSE">
              CSE
            </option>

            <option value="IT">
              IT
            </option>

            <option value="ECE">
              ECE
            </option>

            <option value="ME">
              ME
            </option>

            <option value="Chemical">
              Chemical
            </option>
            
            <option value="Civil">
              Civil
            </option>

             <option value="Biotechnology">
              Biotechnology
            </option>

            <option value="other">
              other
            </option>
          </select>

          {/* Skill Search */}
          <input
            type="text"
            placeholder="Search skill..."
            className="input input-bordered w-64"
            value={
              selectedSkill
            }
            onChange={(e) =>
              setSelectedSkill(
                e.target.value
              )
            }
          />
        </div>

        {/* Student Cards */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredStudents.length >
            0 ? (
            filteredStudents.map(
              (student) => (
                <div
                  key={
                    student._id
                  }
                  className="card bg-base-100 border border-base-300 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="card-body flex">
                    
                    <div className="flex gap-4"> 
                      <div className="flex w-20 h-20 rounded-full bg-secondary/10 text-secondary font-bold text-xl items-center justify-center overflow-hidden">
                      {student.profilePic ? (
                                        <img src={student.profilePic} alt={student.name} className="w-full h-full object-cover" />
                                    ) : ( 
                                        <span>{student.name?.charAt(0).toUpperCase()}</span>
                                    )}
                    </div>
 
                    <h2 className="card-title text-base-content text-xl">
                        {
                           student.name
                        }
                     </h2>
                    </div>

                    {/* Department */}
                    <p className="text-base-content/70 font-medium">
                      Department:
                      <span className="font-semibold ml-2 text-primary">
                        {
                          student.department
                        }
                      </span>
                    </p>

                    {/* Skills */}
                    <div className="mt-3">
                      <h3 className="font-bold text-base-content mb-2">
                        Skills
                      </h3>

                      <div className="flex flex-wrap gap-2">
                        {student
                          .teachSkills
                          ?.length >
                          0 ? (
                          student.teachSkills.map(
                            (
                              skill,
                              index
                            ) => (
                              <div
                                key={
                                  index
                                }
                                className="badge badge-primary badge-outline p-4"
                              >
                                {
                                  skill
                                }
                              </div>
                            )
                          )
                        ) : (
                          <p className="text-sm text-base-content/50">
                            No
                            skills
                            added
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="mt-4">
                      <p className="font-medium text-warning">
                        <RatingBadge userId={student._id} />
                      </p>
                    </div>

                    {/* Button */}
                    <button
                      onClick={() =>
                        navigate(
                          `/profile/${student._id}`
                        )
                      }
                      className="btn btn-primary mt-5 w-full"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="col-span-full text-center text-base-content/60 text-lg font-medium">
              No students found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchStudent;