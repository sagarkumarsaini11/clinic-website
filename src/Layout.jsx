import { Outlet } from "react-router-dom";


import Sidebar1 from "./Components/Sidebar1/Sidebar1";

const Layout = () => {
  return (
    <div className="app-layout">

      {/* Fixed Sidebar */}
   <Sidebar1/>

      {/* Page Content */}
      <div className="main-content-sidebar1-admin">
        <Outlet />
      </div>

    </div>
  );
};

export default Layout;