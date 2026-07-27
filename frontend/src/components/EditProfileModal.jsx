import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";

const EditProfileModal = ({ open, setOpen, user, setUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    role: "",
    bio: "",
    college:"",
  });

  // fill form when modal opens
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        department: user.department || "",
        role: user.role || "",
        bio: user.bio || "",
        college: user.college || "",
      });
    }
      console.log("USER IN UI:", user);

  }, [user]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      console.log("FORMDATA:", formData);
      const res = await axiosInstance.put(
        "/auth/update-profile2",
        formData
      );

      console.log("Updated user:", res.data);

      //  update UI instantly
      setUser(res.data);

      setOpen(false);
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box">

        <h3 className="font-bold text-2xl mb-5">
          Edit Profile
        </h3>

        {/* Name */}
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="input input-bordered w-full mb-4"
          placeholder="Name"
        />

        {/* Department */}
        <input
          name="department"
          type="text"
          value={formData.department}
          onChange={handleChange}
          className="input input-bordered w-full mb-4"
          placeholder="Department"
        />

        {/* Role */}
        <input
          name="role"
          type="text"
          value={formData.role}
          onChange={handleChange}
          className="input input-bordered w-full mb-4"
          placeholder="Role"
        />

        <input
          name="college"
          type="text"
          value={formData.college}
          onChange={handleChange}
          className="input input-bordered w-full mb-4"
          placeholder="College Name"
        />

        {/* Bio */}
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          placeholder="Bio"
        />

        {/* Buttons */}
        <div className="modal-action">
          <button
            onClick={() => setOpen(false)}
            className="btn"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="btn btn-primary"
          >
            Save
          </button>
        </div>

      </div>
    </dialog>
  );
};

export default EditProfileModal;