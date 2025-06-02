import { BellIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { Link, useLocation } from "react-router";
import ThemeSelector from "./ThemeSelector";
import { useLogout, useAuthUser } from "../hooks";
import { Logo } from "../components";

const Navbar = ({ toggleSidebar, showSidebar }) => {
  const { authUser } = useAuthUser();
  const { logoutMutation } = useLogout();

  const callPath = useLocation().pathname.split("/")[1] === "call";

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center w-full">
      <div className="pl-5 sm:px-6 lg:px-8 flex items-center">
        {/* Hamburger Menu Button - Only visible on mobile */}
        {showSidebar && (
          <button
            className="btn btn-ghost btn-circle mr-2 block sm:hidden"
            onClick={toggleSidebar}
          >
            <MenuIcon className="h-5 w-5 text-base-content opacity-70" />
          </button>
        )}

        {callPath ? (
          <Logo className="gap-2.5" />
        ) : (
          <Link to="/">
            <Logo className="gap-2.5" />
          </Link>
        )}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle btn-sm sm:btn-md">
                <BellIcon className="h-4 w-4 sm:h-6 sm:w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>
          {/* Theme Selector */}
          <ThemeSelector />

          <div className="avatar">
            <div className="w-7 sm:w-9 rounded-full">
              <img
                src={authUser?.profilePic}
                alt="User Avatar"
                rel="noreferrer"
              />
            </div>
          </div>

          {/* Logout button */}
          <button
            className="btn btn-ghost btn-circle btn-sm sm:btn-md"
            onClick={() => logoutMutation()}
          >
            <LogOutIcon className="h-4 w-4 sm:h-6 sm:w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
