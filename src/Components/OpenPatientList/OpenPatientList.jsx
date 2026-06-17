import React, { useState, useEffect } from "react";
import "./OpenPatientList.css";
import { useNavigate, useLocation } from "react-router-dom";

import { FaTimes } from "react-icons/fa";

export default function OpenPatientList() {

 const navigate = useNavigate();
const location = useLocation();

  const [showIdCard, setShowIdCard] = useState(false);
  const [loading, setLoading] = useState(true);

  const [patient, setPatient] = useState({
    fileNo: "",
    name: "",
    age: "",
    sex: "",
    whatsapp: "",
    address: "",
    problem: "",
    balanceSessions: 12,
    attendance: 72,
    punctuality: 85,
  });

  useEffect(() => {
    fetchPatient();
  }, []);

  const fetchPatient = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://clinic-backend-5ucx.onrender.com/api/appointment/list"
      );

      const data = await response.json();

      console.log("API DATA", data);

      const patientData = Array.isArray(data)
        ? data[0]
        : data.data?.[0] || data.appointments?.[0];

      if (patientData) {
        setPatient({
          fileNo:
            patientData.fileNo ||
            patientData.fileNumber ||
            "12345",

          name: patientData.name || "",

          age: patientData.age || "",

          sex:
            patientData.gender ||
            patientData.sex ||
            "",

          whatsapp:
            patientData.mobile ||
            patientData.whatsapp ||
            "",

          address:
            patientData.address || "",

          problem:
            patientData.problem || "",

          balanceSessions: 12,

          attendance: 72,

          punctuality: 85,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const shareWhatsApp = () => {
    const text =
      `Patient ID Card\n\n` +
      `File No: ${patient.fileNo}\n` +
      `Name: ${patient.name}\n` +
      `Age/Sex: ${patient.age}/${patient.sex}\n` +
      `Mobile: ${patient.whatsapp}`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`
    );
  };

  if (loading) {
    return (
      <div className="patient-file-page">
        <h2 style={{ textAlign: "center" }}>
          Loading Patient...
        </h2>
      </div>
    );
  }

  return (
    <>
    
    <div className="patient-file-page">
      <div className="patient-file-card">

         <FaTimes
  className="close-icon-patient-file"  onClick={() =>
     navigate("/homepage", {
      state: {
        openPatientPopup: true,
      },
    })
  }/>  
                   {/* Patient Details */}
                     
        <h2>Patient File</h2>
        <div className="patient-info">

          <p>  <strong>File No:</strong>{" "} {patient.fileNo} </p>
          <p> <strong>Name:</strong>{" "} {patient.name}</p>
          <p> <strong>Age/Sex:</strong>{" "}    {patient.age} / {patient.sex}</p>
          <p><strong>Mobile:</strong>{" "}   {patient.whatsapp}</p>
          <p> <strong>Address:</strong>{" "} {patient.address}</p>
          <p> <strong>Problem:</strong>{" "}  {patient.problem} </p>
          <p> <strong>Balance Sessions:</strong>{" "}
           {patient.balanceSessions}  </p>
          
        </div>
                    {/* Hyperlinks */}

        <div className="link-grid">

          <button  onClick={() =>  navigate("/prescription")} >
           Patient Prescription
           </button>  

          <button   onClick={() => setShowIdCard(true)} > Show ID Card</button>

          <button  onClick={() => navigate("/treatmentprotocol")} >
           Treatment Protocol
           </button>   

          <button   onClick={() => navigate("/attendance") } >
           Attendance Sheet
           </button>   

          <button   onClick={() =>  navigate("/recharge") }>  Recharge</button>
        </div>

                    {/* Attendance meters */}

        <div className="meter-section">

          <h3>Attendance %</h3>

          <div className="meter">
            <div
              className="meter-fill"
              style={{
                width: `${patient.attendance}%`,  }}>
            {patient.attendance}%
            </div>
         </div>     
          
          <p>Good</p>

          <h3>Punctuality %</h3>

          <div className="meter">
            <div className="meter-fill"  style={{  width: `${patient.punctuality}%`,  }} >
              {patient.punctuality}%
            </div>
          </div>    

          <p>Excellent</p>

        </div>

        <div className="bill-section">

          <h3>Patient Bills</h3>

          <ul>
            <li>Bill #1001 - ₹250</li>
            <li>Bill #1002 - ₹1125</li>
            <li>Bill #1003 - ₹600</li>
          </ul>

        </div>

      </div>

      {showIdCard && (

        <div className="modal-overlay">

          <div className="id-card">

            <h3>Patient ID Card</h3>

            <p>File No: {patient.fileNo}</p>

            <p>Name: {patient.name}</p>

            <p> Age/Sex:  {patient.age}/{patient.sex} </p>
          
            <p> Mobile:  {patient.whatsapp}</p>
             
            <button   onClick={shareWhatsApp}>
            Share ID on WhatsApp
            </button>
            
            <button className="close-btn" onClick={() =>   setShowIdCard(false)} >
             Close</button>
          
          </div>

        </div>

      )}
    </div>
    </>
  );
}