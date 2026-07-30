import { useState } from "react";
import { House, Search, BookOpenText, GitPullRequestCreate, MessageCircle, Shell, Star, Settings, UserPen, MessagesSquare, Menu, X,} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium
    ${isActive
      ? "bg-primary text-primary-content shadow-md"
      : "text-base-content hover:bg-primary hover:text-primary-content"
    }`;

  return (
    <>
      {/* Mobile Navbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-base-100 border-b border-base-300 flex items-center px-4 z-40">

        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-ghost btn-circle"
        >
          <Menu size={24} />
        </button>

        <h1 className="ml-4 text-xl font-bold text-primary">
          SkillOrbit
        </h1>

      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 h-screen bg-base-100 border-r border-base-300 shadow-lg z-50 overflow-y-auto transform transition-transform duration-300
          ${isOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }
          lg:translate-x-0
        `}
      >

        {/* Sidebar Header */}

        <div className="flex items-center justify-between p-5 border-b border-base-300">

          <h1 className="text-2xl font-bold text-primary">
            SkillOrbit
          </h1>

          <button
            className="lg:hidden btn btn-ghost btn-circle"
            onClick={() => setIsOpen(false)}
          >
            <X size={22} />
          </button>

        </div>

        {/* Navigation */}

        <nav className="p-4 space-y-2">
          <NavLink
            to="/home"
            className={menuClass}
            onClick={() => setIsOpen(false)}
          >
            <House size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/search-students"
            className={menuClass}
            onClick={() => setIsOpen(false)}
          >
            <Search size={20} />
            Search Students
          </NavLink>

          <NavLink
            to="/my-skills"
            className={menuClass}
            onClick={() => setIsOpen(false)}
          >
            <BookOpenText size={20} />
            My Skills
          </NavLink>

          <NavLink
            to="/my-request"
            className={menuClass}
            onClick={() => setIsOpen(false)}
          >
            <GitPullRequestCreate size={20} />
            My Request
          </NavLink>

          <NavLink
            to="/my-sessions"
            className={menuClass}
            onClick={() => setIsOpen(false)}
          >
            <Shell size={20} />
            Sessions
          </NavLink>

          <NavLink
            to="/messages"
            className={menuClass}
            onClick={() => setIsOpen(false)}
          >
            <MessageCircle size={20} />
            Messages
          </NavLink>

          <NavLink
            to="/reviews"
            className={menuClass}
            onClick={() => setIsOpen(false)}
          >
            <Star size={20} />
            Reviews
          </NavLink>

          <NavLink
            to="/profile"
            className={menuClass}
            onClick={() => setIsOpen(false)}
          >
            <UserPen size={20} />
            My Profile
          </NavLink>

          <NavLink
            to="/community"
            className={menuClass}
            onClick={() => setIsOpen(false)}
          >
            <MessagesSquare size={20} />
            Community
          </NavLink>

          <NavLink
            to="/settings"
            className={menuClass}
            onClick={() => setIsOpen(false)}
          >
            <Settings size={20} />
            Settings
          </NavLink>

        </nav>
      </aside>
    </>
  );
};

export default Sidebar;