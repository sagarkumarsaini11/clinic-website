import React, { useState } from "react";
import "./HomePage.css";

import {
  FaBell,
  FaCamera,
  FaTimes,
  FaWallet,
  FaFolder,
  FaHome,
  FaWhatsapp,
  FaFilePrescription,
  FaClipboardList,
  FaCalendarCheck,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [fileNumber, setFileNumber] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showPatientCard, setShowPatientCard] = useState(false);

  const handleSubmit = () => {
    if (fileNumber.length !== 5) {
      alert("Please enter valid 5 digit file number");
      return;
    }

    setShowPatientCard(true);
  };

  return (
    <div className="container-homepage">

                      {/* Header */}

      <div className="header">
       <button className="menu-btn"  onClick={() => setShowSidebar(true)}>☰
         </button>

        <h2>Homepage</h2>

         <div className="notification">
          <FaBell size={24} />
           <span className="badge">3</span>
         </div>
        </div>

                      {/* Sidebar */}

      {showSidebar && (
        <div className="sidebar-overlay"   onClick={() => setShowSidebar(false)}>

          <div className="sidebar"  onClick={(e) => e.stopPropagation()}>
           
          <h2>MENU</h2>

            <button  onClick={() =>{ navigate("/addpatient");
              setShowSidebar(false);
            }}>Add New Patient</button>
            <button>Time Table</button>
            <button>Download Report</button>
            <button>New Query</button>
          </div>
        </div>
      )}

                           {/* Search */}
      <div className="search-box">
        <input  type="number"  placeholder="Enter File Number"  value={fileNumber}
         onChange={(e) => setFileNumber(e.target.value)}/>
        <FaCamera size={25} />
        </div>

                       {/* Buttons */}
      <button  className="main-btn" onClick={handleSubmit}>SUBMIT</button>
      <button className="main-btn" onClick={() => navigate("/addpatient")}>
        ADD NEW PATIENT</button>
      <button className="main-btn">TIME TABLE</button>
      <button className="main-btn"> DOWNLOAD REPORT </button>
      <button className="main-btn">NEW QUERY</button>
        
                       {/* Patient Modal */}

      {showPatientCard && (
        <div className="modal-overlay">
          <div className="patient-card">

            <FaTimes className="close-icon" onClick={() => setShowPatientCard(false)}/>

                    {/* patient-header */}

            <div className="patient-header">
              <h2>Rajan (27 / Male)</h2>

              <p> Last Attendance Date: 18-05-2026</p>
               <p> File Number: 123456</p>
               <p> Appointment Number: 23423 </p>
          </div> 
             
             {/* patient-header Mark Attendence*/}
            <div className="attendance-box">
              <h3>✔ Mark Attendance</h3>
            </div>
               
               {/* patient-feature-card Reacharge */}
            <div className="feature-row">
           <div className="feature-card">
              <FaWallet size={35}/>
              <p>Recharge</p>
            </div>
             
             {/* patient-feature-card patient file */}
           <div className="feature-card">
             <FaFolder size={35} />
            <p>Open Patient File</p>
          </div>
              
              {/* patient-feature-card Homegae */}
           <div className="feature-card">
              <FaHome size={35} />
            <p>Homepage</p>
            </div>
              
               {/* patient-feature-card prescription */}
           <div className="feature-card" onClick={() => navigate("/prescription")}>
              <FaFilePrescription size={35} />
             <p>Prescription</p>
              </div>

                 {/* patient-feature-card Treatment protocol */}
             <div className="feature-card" >
              <FaClipboardList size={35} />
             <p>Treatment Protocol</p>
             </div>
            
                  {/* patient-feature-card Attendance */}
             <div className="feature-card">
              <FaCalendarCheck size={35} />
               <p>Attendance Sheet</p>
             </div>
            </div>
                    
                    {/*blance-box sessions */}
            <div className="balance-box">
              <h3>Balance Sessions</h3>
              <h1>12</h1>
              <h4>Advance Physiotherapy</h4>
            </div>    
              
              {/*stats-row  */}
            <div className="stats-row">

              <div>
                <h3>Attendance</h3>
                <h2>72%</h2>
                <p>Good</p>
              </div>

              <div>
                <h3>Punctuality</h3>
                <h2>85%</h2>
                <p>Excellent</p>
              </div>
            </div>
                
                {/*Share id button */}
            <button className="whatsapp-btn">
              <FaWhatsapp />
              Share ID on WhatsApp
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;