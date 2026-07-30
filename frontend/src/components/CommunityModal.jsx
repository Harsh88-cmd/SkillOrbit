import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../api/axios";

const CommunityModal = ({onClose,fetchPosts, editingPost,}) => {

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Fill inputs while editing
  useEffect(() => {

    if (editingPost) {
      setCategory(editingPost.category);
      setTitle(editingPost.title);
      setDescription(editingPost.description);
    }

  }, [editingPost]);

  const handleSubmit = async () => {

    if (!category || !title || !description) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {

      if (editingPost) {

        // UPDATE POST

        await axiosInstance.put(
          `/community/posts/${editingPost._id}`,
          {
            category,
            title,
            description,
          }
        );

        toast.success("Post updated successfully");

      } else {

        // CREATE POST

        await axiosInstance.post(
          "/community/createPost",
          {
            category,
            title,
            description,
          }
        );

        toast.success("Post created successfully");

      }

      // Refresh posts
      await fetchPosts();

      // Clear form
      setCategory("");
      setTitle("");
      setDescription("");

      onClose();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <dialog className="modal modal-open">

      <div className="modal-box">

        <h3 className="font-bold text-xl">
          {editingPost ? "Edit Post" : "Create a Post"}
        </h3>

        {/* Category */}
        <label className="form-control w-full mt-5">
          <div className="label">
            <span className="label-text">
              Category
            </span>
          </div>

          <select
            className="select select-bordered"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option>React</option>
            <option>Node.js</option>
            <option>Express</option>
            <option>MongoDB</option>
            <option>JavaScript</option>
            <option>Java</option>
            <option>Python</option>
            <option>C++</option>
            <option>AI</option>
            <option>Career</option>
            <option>General Discussion</option>
            <option>Others</option>
          </select>

        </label>

        {/* Title */}

        <label className="form-control w-full mt-2">

          <div className="label">
            <span className="label-text">
              Title
            </span>
          </div>

          <input
            type="text"
            className="input input-bordered"
            placeholder="Write a title..."
            maxLength={100}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="label">
            <span className="label-text-alt">
              {title.length}/100
            </span>
          </div>

        </label>

        {/* Description */}

        <label className="form-control w-full mt-2">

          <div className="label">
            <span className="label-text">
              Description
            </span>
          </div>

          <textarea
            className="textarea textarea-bordered h-32"
            placeholder="Write description..."
            maxLength={300}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="label">
            <span className="label-text-alt">
              {description.length}/300
            </span>
          </div>

        </label>

        {/* Buttons */}

        <div className="modal-action">

          <button
            className="btn"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              editingPost ? "Update" : "Post"
            )}
          </button>

        </div>

      </div>

      <div
        className="modal-backdrop"
        onClick={onClose}
      ></div>

    </dialog>
  );
};

export default CommunityModal;