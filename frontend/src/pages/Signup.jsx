import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

// Fixed branch list — keeps department values consistent across all users,
// which makes filtering in Search Students reliable.
const DEPARTMENTS = [
  "CSE",
  "IT",
  "ECE",
  "EEE",
  "ME",
  "Civil",
  "Chemical",
  "Biotechnology",
  "Other",
];

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await register(form.name, form.email, form.password, form.department);
      toast.success("Account created!");
      navigate("/home");
    } catch (err) {
      console.log(err.response?.data);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 sm:px-8 py-10 md:py-8">
          <div className="w-full max-w-md">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-base-content">
              Create Your Account
            </h1>

            <p className="text-base-content/60 mb-6">
              Join our community and start exchanging skills
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block mb-1 font-medium text-base-content">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Arjun Kumar"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  required
                  className="input input-bordered w-full rounded-xl px-4 py-3 h-auto focus:outline-primary"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 font-medium text-base-content">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  required
                  className="input input-bordered w-full rounded-xl px-4 py-3 h-auto focus:outline-primary"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 font-medium text-base-content">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  minLength={6}
                  className="input input-bordered w-full rounded-xl px-4 py-3 h-auto focus:outline-primary"
                />
                <p className="text-sm text-base-content/50 mt-1">
                  Minimum 6 characters
                </p>
              </div>

              {/* Department — CHANGED: was free-text input, now a fixed dropdown */}
              <div>
                <label className="block mb-1 font-medium text-base-content">
                  Department (Branch)
                </label>
                <select
                  value={form.department}
                  onChange={(e) =>
                    setForm({ ...form, department: e.target.value })
                  }
                  required
                  className="select select-bordered w-full rounded-xl px-4 py-3 h-auto focus:outline-primary"
                >
                  <option value="" disabled>
                    Select your branch
                  </option>
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full rounded-xl py-3 h-auto"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center mt-5 text-base-content/70">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="/signup2.png"
            alt="Signup"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;