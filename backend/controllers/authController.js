import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
};

export const register = async (req, res) => {
  try {
    const { name, email, password, department } = req.body;

    if (!name || !email || !password || !department) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({name,email,password: hashed,department,});

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Save token in cookie
    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        department: user.department,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // save token in cookie
    res.cookie("token", token, cookieOptions);

    // remove password
    const userWithoutPassword =
      await User.findById(user._id).select("-password");

    res.json({
      user: userWithoutPassword,
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", cookieOptions);

  res.json({
    message: "Logged out successfully",
  });
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    let profilePicUrl;

    // Upload to Cloudinary if a file was sent
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profile_pics" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });

      profilePicUrl = uploadResult.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(profilePicUrl && { profilePic: profilePicUrl }),
      },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);

  } catch (error) {
    console.log("Update profile error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile2 = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, department, role, bio,college} = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(name && { name }),
        ...(department && { department }),
        ...(role && { role }),
        ...(bio && { bio }),
         ...(college && { college }),
      },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};