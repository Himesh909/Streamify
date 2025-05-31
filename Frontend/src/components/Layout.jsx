import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children, showSidebar = false }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to close the sidebar - will be used after navigation
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex relative">
        {/* Mobile overlay/backdrop - only visible when sidebar is open on mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 sm:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* 
          Sidebar visibility logic:
          - On mobile: Only shown when toggled (isSidebarOpen)
          - On tablet/desktop (sm+): Always visible regardless of toggle state
        */}
        <div className={`${isSidebarOpen ? "block" : "hidden"} sm:block`}>
          <Sidebar closeSidebarOnMobile={closeSidebar} />
        </div>

        <div className="flex-1 flex flex-col">
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
