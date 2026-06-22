import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import {
  FaThLarge,
  FaPlusCircle,
  FaHospital,
  FaUserCircle,
  FaKey,
  FaSignOutAlt,
  FaChartLine,
  FaBars,
} from "react-icons/fa";

import "./Sidebar1.css";

const Sidebar1 = () => {
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] =  useState(false);
const dropdownRef = useRef(null);
const sidebarRef = useRef(null);
  const [user, setUser] = useState(null);


//FOR profile API
  useEffect(() => {
    const token = Cookies.get("token");
    const storedUser = Cookies.get("user");

    if (!token || !storedUser) {
      navigate("/");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);

      setUser(parsedUser);

      console.log("Logged User:", parsedUser);
    } catch (error) {
      console.log(error);

      Cookies.remove("token");
      Cookies.remove("refreshToken");
      Cookies.remove("user");

      navigate("/");
    }
  }, [navigate]);

//Handle Click
useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setShowProfile(false);
    }
  };

  document.addEventListener(
    "click",
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      "click",
      handleClickOutside
    );
  };
}, []);

//sidebar for mobile view function
useEffect(() => {

  const handleSidebarOutside = (
    event
  ) => {

    if (
      window.innerWidth <= 768 &&
      sidebarRef.current &&
      !sidebarRef.current.contains(
        event.target
      )
    ) {

      setSidebarOpen(false);

    }
  };

  document.addEventListener(
    "mousedown",
    handleSidebarOutside
  );

  return () =>
    document.removeEventListener(
      "mousedown",
      handleSidebarOutside
    );

}, []);

//Logout Function
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    Cookies.remove("user");

    setUser(null);

    console.clear();

    navigate("/");
  };

  return (
    <>
      {/* TOP NAVBAR */}

      <div className="top-navbar-sidebar1-admin">

  <FaBars
    className="mobile-menu-icon"
    onClick={() => setSidebarOpen( !sidebarOpen ) } />

        <h3 className="admin-title"> Admin Panel</h3>
         
        
                    {/* profile */}
        <div className="profile-wrapper" ref={dropdownRef}>
 
 


         <FaUserCircle className="profile-icon-sidebar1-admin"
         onClick={(e) => {  e.stopPropagation();
          setShowProfile(!showProfile);}}/>
   
  

          {/* profile data */}
          {showProfile && (
            <div className="profile-dropdown">

              <div className="profile-info">

                <h4> {user?.name || "No Name"}</h4>
                <p> {user?.email || "No Email"} </p>
                <p> Role : {user?.role}</p>
                <p>ID : {user?.id}</p>

              </div>

              <hr />
                          {/* Profile button */}
              <button>
                <FaUserCircle />Profile</button>
                
              <button>
                <FaKey />Change Password</button>
                
              <button onClick={handleLogout}>
                <FaSignOutAlt /> Logout</button>
                 </div>
          )}

        </div>
      </div>
              
                              {/* Sidebar in  MOBILE VIEW */}
      {sidebarOpen && (
       <div  className="sidebar-overlay"
         onClick={() =>  setSidebarOpen(false)}/>
        )}
    
                  {/* SIDEBAR */}

      <div  ref={sidebarRef}  className={`sidebar1-admin ${
     sidebarOpen ? "sidebar-open": "sidebar-close"}`}>
  

        <div className="logo-section-sidebar1-admin">

          <img  src="/logo.png"
           alt="Logo"
            className="logo-sidebar-sidebar1-admin" />
          
          <div className="logo-text-sidebar1-admin">
            <h2>Krishna</h2>
            <p>ADVANCE PHYSIO</p>
          </div>
        </div>
                  
                  {/* submenu */}
       <nav className="navbar-sidebar1-admin">
                
                 {/* Dashboard */}
     <NavLink  to="/dashboard-admin"
     onClick={() => setSidebarOpen(false) }

       className={({ isActive }) =>
        isActive
      ? "menu-btn-sidebar1-admin active"
      : "menu-btn-sidebar1-admin"
  }>

    <FaThLarge />  Dashboard </NavLink>
  
 

           {/* Add clinic */}
<NavLink
  to="/add-clinic"
  state={{ isEdit: false }}
  onClick={() => setSidebarOpen(false)}
  className={({ isActive }) =>
    isActive
      ? "menu-btn-sidebar1-admin active"
      : "menu-btn-sidebar1-admin"
  }>

  <FaPlusCircle />
  Add Clinic
</NavLink>


          {/* Running clinic */}
<NavLink
  to="/running-clinic"
  onClick={() =>
    setSidebarOpen(false)
  }
  className={({ isActive }) =>
    isActive
      ? "menu-btn-sidebar1-admin active"
      : "menu-btn-sidebar1-admin"
  }
>
    <FaHospital />
    Running Clinic
  </NavLink>
 
           {/* Suspended clinic */}
<NavLink
  to="/suspended-clinic"
  onClick={() =>
    setSidebarOpen(false)
  }
  className={({ isActive }) =>
    isActive
      ? "menu-btn-sidebar1-admin active"
      : "menu-btn-sidebar1-admin"
  }
>
    <FaHospital />
    Suspended Clinic
  </NavLink>

           {/* Financal -report */}
<NavLink
  to="/financial-report"
  onClick={() =>
    setSidebarOpen(false)
  }
  className={({ isActive }) =>
    isActive
      ? "menu-btn-sidebar1-admin active"
      : "menu-btn-sidebar1-admin"
  }
>
    <FaChartLine />
    View Financial Report
  </NavLink>

</nav>
      </div>
    </>
  );
};

export default Sidebar1;