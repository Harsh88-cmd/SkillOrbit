/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useEffect,
  useState,
} from "react";

import { axiosInstance } from "../api/axios";
import { useAuth } from "./AuthContext";

export const SkillContext =
  createContext(null);

export const SkillProvider = ({
  children,
}) => {
  const { user } = useAuth();

  const [
    teachSkills,
    setTeachSkills,
  ] = useState([]);

  const [
    learnSkills,
    setLearnSkills,
  ] = useState([]);

  useEffect(() => {
    const fetchSkills =
      async () => {
        // if no logged in user
        if (!user) {
          setTeachSkills([]);
          setLearnSkills([]);
          return;
        }

        try {
          const res =
            await axiosInstance.get(
              "/skills/get"
            );

          setTeachSkills(
            res.data
              ?.teachSkills || []
          );

          setLearnSkills(
            res.data
              ?.learnSkills || []
          );
        } catch (error) {
          console.log(error);
        }
      };

    fetchSkills();
  }, [user]); // 🔥 important

  return (
    <SkillContext.Provider
      value={{
        teachSkills,
        setTeachSkills,
        learnSkills,
        setLearnSkills,
      }}
    >
      {children}
    </SkillContext.Provider>
  );
};