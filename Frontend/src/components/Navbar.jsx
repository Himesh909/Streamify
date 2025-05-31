import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import useAuthUser from "../hooks/useAuthUser";
import { Link, useLocation } from "react-router";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { logoutMutation, isPending, error } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center w-full">
      <div className="pl-5 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <ShipWheelIcon className="size-6 sm:size-9 text-primary" />
          <span className="text-xl sm:text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
            Streamify
          </span>
        </Link>
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
            onClick={logoutMutation}
          >
            <LogOutIcon className="h-4 w-4 sm:h-6 sm:w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
