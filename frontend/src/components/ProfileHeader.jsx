import { useRef, useState } from "react";
import { axiosInstance } from "../api/axios";

const ProfileHeader = ({
  user,
  editable = false,
  setUser,
}) => {
  const fileInputRef = useRef(null);

  const [uploading, setUploading] =
    useState(false);

  const handleImageClick = () => {
    if (!editable) return;

    fileInputRef.current?.click();
  };

  const handleImageUpload = async (
    e
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    if (
      file.size >
      2 * 1024 * 1024
    ) {
      alert(
        "Image size should be less than 2MB"
      );
      return;
    }

    const previewURL =
      URL.createObjectURL(file);

    const tempUser = {
      ...user,
      profilePic: previewURL,
    };

    setUser(tempUser);

    try {
      setUploading(true);

      const formData =
        new FormData();

      formData.append(
        "profilePic",
        file
      );

      const res =
        await axiosInstance.put(
          "/auth/update-profile",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      const updatedUser =
        res.data;

      setUser(updatedUser);

      localStorage.setItem(
        "user",
        JSON.stringify(
          updatedUser
        )
      );
    } catch (error) {
      console.log(
        error.response?.data ||
          error.message
      );

      setUser(user);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <img
          src={
            user?.profilePic ||
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          alt="profile"
          className={`w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-primary shadow-lg ${
            editable
              ? "cursor-pointer"
              : ""
          }`}
          onClick={
            editable
              ? handleImageClick
              : undefined
          }
        />

        {uploading && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm rounded-full">
            Uploading...
          </div>
        )}
      </div>

      {editable && (
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          hidden
          onChange={
            handleImageUpload
          }
        />
      )}
    </div>
  );
};

export default ProfileHeader;