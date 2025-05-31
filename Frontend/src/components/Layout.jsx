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
    <div className="min-h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
      <div className="flex flex-1 relative">
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
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } sm:block sm:sticky sm:top-16 h-[calc(100vh-4rem)]`}
        >
          <Sidebar
            closeSidebarOnMobile={closeSidebar}
            showSidebar={showSidebar}
          />
        </div>

        <div className="flex-1 flex flex-col overflow-auto">
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
