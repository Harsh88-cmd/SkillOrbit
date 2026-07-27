import User from "../models/User.js";
import Skill from "../models/skill.model.js";

export const getAllStudents = async (req, res) => {
  try {

    // Get all users except password
    const users = await User.find()
      .select("-password");

    // Get all skills
    const allSkills = await Skill.find();

    // Merge users with skills
    const students = users.map((user) => {

      const skillData = allSkills.find(
        (skill) =>
          skill.userId.toString() ===
          user._id.toString()
      );

      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        department: user.department,
        profilePic: user.profilePic,

        teachSkills:
          skillData?.teachSkills || [],

        learnSkills:
          skillData?.learnSkills || [],
      };
    });

    res.status(200).json(students);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ← fetch skills separately
    const skillData = await Skill.findOne({ userId: user._id });

    const userWithSkills = {
      _id: user._id,
      name: user.name,
      email: user.email,
      department: user.department,
      college: user.college,
      bio: user.bio,
      role: user.role,
      profilePic: user.profilePic,
      teachSkills: skillData?.teachSkills || [],
      learnSkills: skillData?.learnSkills || [],
    };

    res.status(200).json(userWithSkills);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};