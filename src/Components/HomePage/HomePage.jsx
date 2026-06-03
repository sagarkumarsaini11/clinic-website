import React, { useState, useEffect,} from "react";
import "./HomePage.css";
import { useNavigate, useLocation } from "react-router-dom";
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
  FaSearch,
} from "react-icons/fa";



const HomePage = () => {

const navigate = useNavigate();
const location = useLocation();

//current patients details
const [currentPatient, setCurrentPatient] =
  useState(null);

const [searchValue, setSearchValue] = useState("");

  const [showSidebar, setShowSidebar] =
    useState(false);

  const [showPatientCard, setShowPatientCard] =
    useState(false);

    const [attendanceMarked, setAttendanceMarked] =
  useState(false);

const [attendanceDate, setAttendanceDate] =
  useState("Not Marked");

const [updatedFileNumber, setUpdatedFileNumber] =
  useState("00000");

       //data list add appoi. add patient
       const [loading, setLoading]= useState(true);

  const [patientList, setPatientList] =
  useState([]);

const [appointmentList, setAppointmentList] =
  useState([]);

//open popup

useEffect(() => {
  if (location.state?.openPatientPopup) {
    setShowPatientCard(true);
  }
}, [location]);

      //API 
useEffect(() => {

  const fetchAppointments = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        "https://clinic-backend-5ucx.onrender.com/api/appointment/list"
      );

      const data = await response.json();

      console.log("API Data:", data);

      if (response.ok) {

        if (Array.isArray(data)) {

          setAppointmentList(data);

        } else if (data.appointments) {

          setAppointmentList(
            data.appointments
          );

        } else if (data.data) {

          setAppointmentList(
            data.data
          );

        }

      }

    } catch (error) {

      console.error(
        "Fetch Error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };

  fetchAppointments();

}, []);

  // SEARCH BUTTON CLICK
const handleSubmit = () => {

const patient = appointmentList.find(
  (item) =>
    item.name?.toLowerCase() ===
      searchValue.toLowerCase() ||
    item.mobile === searchValue ||
    item.fileNo === searchValue
);

if (!patient) {
  alert("Patient Not Found");
  return;
}

setCurrentPatient(patient);

setAttendanceMarked(false);
setAttendanceDate("Not Marked");

setShowPatientCard(true);
};
  // CAMERA CLICK

  const handleCameraClick = () => {

    alert(
      "Camera Scanner Opened Successfully"
    );

    // Here you can add scanner functionality later
  };

     // enter key
     const handleEnterKey = (e) => {

  if (e.key === "Enter") {

    e.preventDefault();

    handleSubmit();

  }

}; 

  //Attandence marked

const handleMarkAttendance = () => {

  const today =
    new Date().toLocaleDateString();

  setAttendanceMarked(true);

  setAttendanceDate(today);

  alert(
    `${currentPatient?.name} Attendance Marked`
  );
};


// delete button 


  return (

    <div className="container-homepage">

      {/* Header */}

      <div className="header">

        <button
          className="menu-btn"  onClick={() =>  setShowSidebar(true)}>
         ☰
         </button> 

        <h2>Homepage</h2>

        <div className="notification">

          <FaBell size={24} />

          <span className="badge">3 </span>
        </div>    
       </div>   

        

     

                        {/* Sidebar */}

      {showSidebar && (

        <div  className="sidebar-overlay" onClick={() =>setShowSidebar(false) } >

          <div className="sidebar"  onClick={(e) => e.stopPropagation()}>
           <h2>MENU</h2>
            <button onClick={() => {  navigate("/");  setShowSidebar(false);   }}>
              Web-Homepage 
            </button>  
            <button  onClick={() => { navigate("/addpatient");   setShowSidebar(false);
              }}>  Add New Patient
             </button>
            <button >Time Table</button>
              <button  onClick={() => { navigate("/category");   setShowSidebar(false);
              }}>Service Category</button>
            <button>  Download Report</button>
             <button> New Query</button>
   
          </div>

        </div>
      )}

                         {/* SEARCH BOX */}

      <div className="search-box">
     <input
  type="text"
  placeholder="Enter File No / Patient Name / Mobile No"
  value={searchValue}
  onChange={(e) =>
    setSearchValue(e.target.value)
  }
 onKeyDown={handleEnterKey}/>



         


                     {/* CAMERA OR SEARCH */}

        {searchValue.trim().length > 0 ? (

          <button  className="search-icon-btn"  onClick={handleSubmit}>
            <FaSearch size={20} />
          </button>

        ) : (

          <button  className="search-icon-btn"  onClick={handleCameraClick}  >
          <FaCamera size={20} />
          </button>
        )}
      </div>      



                {/* Reacord -Section-list */}

          {loading ? (

            <h3 className="loading-text">  Loading Records...</h3>
          ) : (
          <div className="records-section">



            {/* Appointment Records */}


<h2>Appointment Records</h2>

{appointmentList.length === 0 ? (

  <p>No Appointment Added</p>

) : (

  <div className="table-container">

    <table className="appointment-table">

      <thead>
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Mobile</th>
          <th>Address</th>
          <th>Problem</th>
        </tr>
      </thead>

      <tbody>

        {appointmentList.map((item, index) => (

          <tr key={index}>

            <td>{index + 1}</td>

            <td>{item.name}</td>

            <td>{item.age}</td>

            <td>
              {item.gender || item.sex}
            </td>

            <td>
              {item.mobile}
            </td>

            <td>
              {item.address}
            </td>

            <td>
              {item.problem}
            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

)}
   </div>      
)}
        

                        {/* Patient Modal */}

      {showPatientCard && (

        <div className="modal-overlay">
          <div className="patient-card">

            <FaTimes  className="close-icon" onClick={() =>  setShowPatientCard(false) }/>

                           {/* patient-header */}

            <div className="patient-header">

            <h2> {currentPatient?.name}  {" "} ({currentPatient?.age} / {currentPatient?.gender})</h2>

           <p>  Last Attendance Date:  {attendanceDate}</p>
           <p> File Number:{updatedFileNumber}</p>
              <p>   Appointment Number: 23423</p>
             
               
              
                   {/* balance */}

            <div className="balance-box">
              <p> Balance Sessions: 12</p>
              <p>Advance Physiotherapy </p>
          </div>
            </div>
 
            {/* attendance */}

           <div className="attendance-box">

          {!attendanceMarked ? (

      <button className="attendance-btn" onClick={handleMarkAttendance}>
       Mark Attendance
     </button>

      ) : (
 
    <div className="attendance-success">
      <h3> ✅ Attendance Marked</h3>
      </div>  

     )}

      </div>

            {/* feature cards */}

            <div className="feature-row">

     <div  className="feature-card"  onClick={() =>navigate("/recharge", {
         state: {
        returnToPopup: true,
         },})}>

                <FaWallet size={35} />
                <p>Recharge</p>
              </div>

             <div  className="feature-card"  onClick={() =>  navigate("/openpatientlist", {  state: {
        returnToPopup: true,},  }) }>
      
               <FaFolder size={35} />
                <p>Open Patient File</p>
              </div>

              <div className="feature-card">
                <FaHome size={35} />
                <p>Homepage</p>
              </div>

              <div  className="feature-card"  onClick={() =>  navigate("/prescription")}>
          
                <FaFilePrescription size={35} />
                <p>Prescription</p>
              </div>

              <div className="feature-card">
                <FaClipboardList size={35} />
                <p>  Treatment Protocol</p>
             </div>   
              
              <div className="feature-card"  onClick={() =>  navigate("/attendance")}>
                <FaCalendarCheck size={35} />
                <p> Attendance Sheet</p>
               </div>   
            </div>    
 
                    {/* stats */}

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

            {/* whatsapp */}

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