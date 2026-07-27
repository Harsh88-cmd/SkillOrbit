import { useContext } from "react";
import { SkillContext } from "./SkillContext";

export const useSkill = () => {
  return useContext(SkillContext);
};