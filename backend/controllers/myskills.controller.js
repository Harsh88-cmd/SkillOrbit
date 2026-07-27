import Skill from "../models/skill.model.js";

export const addTeachSkill = async (req, res) => {
    try {
        const { skill } = req.body;
        const userId = req.user.id;

        let userSkills = await Skill.findOne({ userId });

        if (!userSkills) {
            userSkills = await Skill.create({
                userId, teachSkills: [skill]
            });
        } else {
            userSkills.teachSkills.push(skill);
            await userSkills.save();
        }

        res.status(201).json({ message: "Teach skilled added", userSkills });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addLearnSkill = async (req, res) => {
    try {
        const { skill } = req.body;
        const userId = req.user.id;

        let userSkills = await Skill.findOne({ userId });

        if (!userSkills) {
            userSkills = await Skill.create({
                userId, learnSkills: [skill]
            });
        } else {
            userSkills.learnSkills.push(skill);
            await userSkills.save();
        }

        res.status(201).json({ message: "Learn skilled added", userSkills });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getSkills = async (req, res) => {
    try {

        const userId = req.user.id;

        const skills = await Skill.findOne({
            userId
        });

        res.status(200).json(skills);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const deleteTeachSkill =async (req, res) => {
  try {

    const { skill } = req.body;

    console.log("Skill from frontend:", skill);

    const userId = req.user.id;

    const updatedSkills =
      await Skill.findOneAndUpdate(
        { userId },
        {
          $pull: {
            teachSkills: skill
          }
        },
        { new: true }
      );

    console.log(updatedSkills);

    res.status(200).json(updatedSkills);

  } catch (error) {
    console.log(error);
  }
};

export const deleteLearnSkill = async (req, res) => {
    try {

        const { skill } = req.body;
        const userId = req.user.id;

        const updatedSkills =
            await Skill.findOneAndUpdate(
                { userId },
                {
                    $pull: {
                        learnSkills: skill
                    }
                },
                { new: true }
            );

        res.status(200).json(updatedSkills);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}