import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  teachSkills: [
    {
      type: String
    }
  ],

  learnSkills: [
    {
      type: String
    }
  ]
}, { timestamps: true });

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;