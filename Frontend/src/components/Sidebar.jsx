import { Link, useLocation } from "react-router";
import { useAuthUser } from "../hooks";
import { BellIcon, HomeIcon, UsersIcon } from "lucide-react";

const Sidebar = ({ closeSidebarOnMobile, showSidebar }) => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  // Navigation links array
  const navLinks = [
    {
      to: "/",
      label: "Home",
      icon: <HomeIcon className="size-5 text-base-content opacity-70" />,
    },
    {
      to: "/friends",
      label: "Friends",
      icon: <UsersIcon className="size-5 text-base-content opacity-70" />,
    },
    {
      to: "/notifications",
      label: "Notifications",
      icon: <BellIcon className="size-5 text-base-content opacity-70" />,
    },
  ];

  // Function to handle link clicks - only closes sidebar on mobile
  const handleLinkClick = () => {
    // Check if we're on mobile by looking at window width
    if (window.innerWidth < 640) {
      closeSidebarOnMobile();
    }
  };

  return (
    showSidebar && (
      <aside className="w-64 bg-base-200 border-r border-base-300 fixed sm:relative flex flex-col h-[calc(100vh-4rem)] top-16 sm:top-0 z-20 shadow-lg sm:shadow-none">
        <nav className="flex-1 p-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
                currentPath === link.to ? "btn-active" : ""
              }`}
              onClick={handleLinkClick}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* USER PROFILE SECTION */}
        <div className="p-4 border-t border-base-300 mt-auto">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={authUser?.profilePic} alt="User Avatar" />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{authUser?.fullName}</p>
              <p className="text-xs text-success flex items-center gap-1">
                <span className="size-2 rounded-full bg-success inline-block" />
                Online
              </p>
            </div>
          </div>
        </div>
      </aside>
    )
  );
};

export default Sidebar;
