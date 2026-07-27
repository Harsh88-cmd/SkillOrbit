import { useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Features", scrollTo: "features" },
  { label: "How it Works", scrollTo: "how-it-works" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hideAuthButtons = ["/login", "/signup"].includes(location.pathname);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (link) => {
    if (link.scrollTo) {
      if (location.pathname === "/") {
        // Already on the landing page, just scroll there
        scrollToSection(link.scrollTo);
      } else {
        // Navigate home first, then scroll once the page has rendered
        navigate("/");
        setTimeout(() => scrollToSection(link.scrollTo), 100);
      }
    } else {
      navigate(link.path);
    }
  };

  const isActive = (link) => link.path && location.pathname === link.path;

  return (
    <div className="navbar bg-base-100/90 backdrop-blur border-b border-base-content/10 px-4 md:px-8 sticky top-0 z-50">

      {/* Logo + Mobile menu */}
      <div className="flex-1 flex items-center gap-2">
        {/* Mobile dropdown */}
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost btn-square" aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-3 shadow bg-base-100 border border-base-content/10 rounded-box w-52 gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNavClick(link)}
                  className={isActive(link) ? "font-semibold text-violet-700" : ""}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => navigate("/")}
          className="text-xl text-violet-700 font-bold tracking-tight"
        >
          SkillOrbit
        </button>
      </div>

      {/* Center Menu - desktop only */}
      <div className="hidden lg:flex flex-1 justify-center">
        <ul className="menu menu-horizontal font-medium gap-1">
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => handleNavClick(link)}
                className={
                  isActive(link)
                    ? "text-violet-700 font-semibold bg-violet-50"
                    : "hover:text-violet-700"
                }
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Buttons */}
      <div className="flex-1 flex justify-end">
        {!hideAuthButtons && (
          <div className="flex gap-2 md:gap-4">
            <button
              className="btn btn-outline btn-primary btn-sm md:btn-md"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="btn btn-active btn-primary btn-sm md:btn-md"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;