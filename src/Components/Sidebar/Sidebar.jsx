import React, { useState } from "react";
import "./Sidebar.css";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      {/* NAVBAR */}

      <div className="navbar">

        <button     className="menu-btn"    onClick={() => setShowSidebar(true)}>
         ☰ </button>
      
        
           <h2>Homepage</h2>
      
        <div className="notification">
          <FaBell size={22} />
          <span className="badge">3</span>
        </div>

      </div>

                 {/* SIDEBAR */}

      {showSidebar && (
        <div  className="sidebar-overlay"
           onClick={() => setShowSidebar(false)}>
       
        
          <div className="sidebar"
              onClick={(e) => e.stopPropagation()} >
         
         
            <h2>MENU</h2>
                 <button
              onClick={() => {
                navigate("/");
                setShowSidebar(false);
              }} >Web-Homepage</button>
           
  
            <button
              onClick={() => {
                navigate("/homepage");
                setShowSidebar(false);
              }} >Homepage</button>
           
            <button
              onClick={() => {
                navigate("/addpatient");
                setShowSidebar(false);
              }} > Add New Patient</button>
           
  
            <button
              onClick={() => {
                navigate("/openpatientlist");
                setShowSidebar(false);
              }} > Open Patient File </button>
           
          
            <button
              onClick={() => {
                navigate("/recharge");
                setShowSidebar(false);
              }}> Recharge</button>
            
        
            <button>Time Table</button>

            <button>Download Report</button>

            <button>New Query</button>

          </div>
        </div>
      )}
    </>
  );
}