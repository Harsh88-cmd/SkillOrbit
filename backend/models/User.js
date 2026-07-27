import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    department: {
      type: String,
      required: true,
    },

     role: {
      type: String,
      default: "Student",
    },

    college: {
      type: String,
      default: "College Name", // or "Frontend Developer"
    },

    bio: {
      type: String,
      default: "",
    },

    profilePic:{
        type: String,
        default:"",
    },
    
  },
  { timestamps: true }
);

const User = mongoose.model(
  "User",
  userSchema
);

export default User;