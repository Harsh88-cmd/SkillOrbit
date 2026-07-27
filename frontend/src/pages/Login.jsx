import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate("/home");
    } catch (err) {
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
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 sm:px-8 py-10 md:py-0">
          <div className="w-full max-w-md">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-base-content">
              Welcome Back!
            </h1>

            <p className="text-base-content/60 mb-6">
              Login to continue your learning journey
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full rounded-xl py-3 h-auto"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Signup Link */}
            <p className="text-center mt-5 text-base-content/70">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-medium">
                Signup
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="/login.png"
            alt="login"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;