import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  console.log("Current Theme:", theme);

  return (
    <input
      type="checkbox"
      className="toggle toggle-sm"
      checked={theme === "lemonade"}
      onChange={toggleTheme}
    />
  );
};

export default ThemeToggle;