import React, { useState } from "react";
import "./AddPatientForm.css";

import {  FaBell,  FaBars,} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AddPatientForm() {

  const navigate = useNavigate();

  // Sidebar State

  const [showSidebar, setShowSidebar] =
    useState(false);

  // Form State

  const [formData, setFormData] =
    useState({
      name: "",
      age: "",
      gender: "",
      mobile: "",
      address: "",
      problem: "",
      appointmentType: "",
    appointmentDate: "",
     appointmentTime: "",
       amount: "",
      cash: "",
      upi: "",
      total: "",
    });


     const [loading, setLoading] = useState(false);
  // Error State

  const [errors, setErrors] =
    useState({});

  // Handle Input

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove Error While Typing

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  //Payment change
 const handlePaymentChange = (e) => {
  const { name, value } = e.target;

  const updatedData = {
    ...formData,
    [name]: value,
  };

  const cash =
    Number(updatedData.cash || 0);

  const upi =
    Number(updatedData.upi || 0);

  updatedData.total = cash + upi;

  setFormData(updatedData);
};

  // Validation

  const validateForm = () => {

    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name =
        "Name is required";
    }

    if (!formData.age.trim()) {
      newErrors.age =
        "Age is required";
    }

    if (!formData.gender.trim()) {
      newErrors.gender =
        "Gender is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile =
        "Mobile number is required";
    }
    else if (
      formData.mobile.length !== 10
    ) {
      newErrors.mobile =
        "Mobile number must be 10 digits";
    }

    if (!formData.address.trim()) {
      newErrors.address =
        "Address is required";
    }

    if (!formData.problem.trim()) {
      newErrors.problem =
        "Problem is required";
    }

    if (!formData.appointmentType) {
  newErrors.appointmentType =
    "Appointment Type is required";
}

if (
  formData.appointmentType === "Standard"
) {

  if (!formData.appointmentDate) {
    newErrors.appointmentDate =
      "Date is required";
  }

  if (!formData.appointmentTime) {
    newErrors.appointmentTime =
      "Time Slot is required";
  }

}

if (!formData.amount) {
  newErrors.amount =
    "Amount is required";
}

if (
  formData.amount &&
  isNaN(formData.amount)
) {
  newErrors.amount =
    "Only numbers allowed";
}

if (
  formData.cash &&
  isNaN(formData.cash)
) {
  newErrors.cash =
    "Only numbers allowed";
}

if (
  formData.upi &&
  isNaN(formData.upi)
) {
  newErrors.upi =
    "Only numbers allowed";
}

    setErrors(newErrors);

    return Object.keys(newErrors)
      .length === 0;
  };

  // Submit

 const handleSubmit = async (e) => {
 console.log("Complete Patient Data:",formData);

  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  try {

    setLoading(true);

    console.log("Sending Data:", formData);

    const response = await fetch(
      "https://clinic-backend-5ucx.onrender.com/api/appointment/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    console.log("Status:", response.status);
    console.log("Response:", data);

    if (!response.ok) {
      alert(
        data.message ||
        "Failed to save patient"
      );
      return;
    }

    alert("Patient Added Successfully!");

    setFormData({
      name: "",
      age: "",
      gender: "",
      mobile: "",
      address: "",
      problem: "",
    });

    setErrors({});

  } catch (error) {

    console.error("API Error:", error);

    alert(
      "Something went wrong. Please try again."
    );

  } finally {

    setLoading(false);
  }
};

  return (

    <div className="page-wrapper-addpatient">

      {/* HEADER */}

      <div className="header-addpatient">

        <button  className="menu-btn-addpatient" onClick={() => setShowSidebar(true)}><FaBars />
         </button>
         
        <h2>Add Patient</h2>   

        <div className="notification-addpatient">

          <FaBell size={22} />

          <span className="badge-addpatient"> 3 </span>
           
        </div> 
      </div>
      
                          {/* SIDEBAR */}

      {showSidebar && (

        <div   className="sidebar-overlay-addpatient" onClick={() =>  setShowSidebar(false) }>
       <div  className="sidebar-addpatient"  onClick={(e) => e.stopPropagation()}>
              
               <h2>MENU</h2>
  
            <button  onClick={() => {  navigate("/homepage");setShowSidebar(false);}}> Homepage
             </button>
  
            <button onClick={() =>   setShowSidebar(false)}> Add New Patient </button>

            <button> Time Table  </button>
           <button> Download Report</button>
            <button> New Query</button>
          </div>

        </div>
      )}

                      {/* FORM */}

      <div className="patient-container-addpatient">

        <div className="patient-card">

          <h2>Add Patient</h2>

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="form-group">

              <label> Name <span>*</span></label>
              <input  type="text"  name="name"  placeholder="Enter Patient Name"
               value={formData.name} onChange={handleChange}  />
                 {errors.name && (
                <p className="error-text">
                  {errors.name}
                </p>
              )}

            </div>
 
            {/* AGE */}

            <div className="form-group">

              <label> Age <span>*</span></label>
              <input    type="number"  name="age"  placeholder="Enter Age"
              value={formData.age}   onChange={handleChange} />
              {errors.age && (
                <p className="error-text">
                  {errors.age}
                </p>
              )}

            </div>

                                {/* GENDER */}

            <div className="form-group">

              <label> Gender <span>*</span></label>
          
              <select  name="gender"   value={formData.gender}  onChange={handleChange} >
                
                <option value="">  Select Gender </option>
                <option value="Male"> Male  </option>
                   <option value="Female"> Female  </option>
                <option value="Other">Other </option>
              </select>

              {errors.gender && (
                <p className="error-text">
                  {errors.gender}
                </p>
              )}

            </div>

            {/* MOBILE */}

            <div className="form-group">

              <label> Mobile Number <span>*</span>    </label>
             
          

              <input  type="tel"    name="mobile" placeholder="Enter Mobile Number"
                maxLength="10"   value={formData.mobile}  onChange={handleChange}/>
               {errors.mobile && (
                <p className="error-text">
                  {errors.mobile}
                </p>
              )}

            </div>

                   {/* ADDRESS */}

            <div className="form-group full-width">

              <label>Address <span>*</span> </label>
                
              <textarea   name="address" rows="3"  placeholder="Enter Address"
               value={formData.address} onChange={handleChange}/>
                {errors.address && (
                <p className="error-text">
                  {errors.address}
                </p>
              )}

            </div>

                      {/* PROBLEM */}

            <div className="form-group full-width">

              <label>  Problem <span>*</span> </label>
              <textarea  name="problem" rows="4"
                placeholder="Describe Patient Problem"  value={formData.problem}
                onChange={handleChange}/>
              {errors.problem && (
                <p className="error-text">
                  {errors.problem}
                </p>
              )}

            </div>

                       {/* APPOINTMENT TYPE */}

        <div className="form-group">

         <label>  Appointment Type <span>*</span></label>

           <div className="radio-group">

            <label>
        <input  type="radio"  name="appointmentType"  value="Standard"
       checked={
          formData.appointmentType ===
          "Standard"
        } onChange={handleChange}/> Standard </label>

    <label>
      <input    type="radio"  name="appointmentType"
     value="Instant" checked={ formData.appointmentType === "Instant"}
       onChange={handleChange}  />  Instant
    </label>   
  </div>       
           {errors.appointmentType && (
      <p className="error-text"> {errors.appointmentType}</p>
      )}
   </div> 

           {/* STANDARD OPTIONS */}

        {formData.appointmentType ===
         "Standard" && (

      <>
         <div className="form-group">
          <label>Available Date <span>*</span></label>
          <input type="date"  name="appointmentDate" value={formData.appointmentDate}
       onChange={handleChange}/>
          {errors.appointmentDate && (
         <p className="error-text">
            {errors.appointmentDate}
        </p>
     )}
</div>


          <div className="form-group">
         <label> Available Time Slot<span>*</span></label>
   
    
  

  <select  name="appointmentTime"  value={formData.appointmentTime}
  onChange={handleChange}>

    <option value="">Select Time</option>

    <option value="09:00 AM">09:00 AM</option>
    <option value="10:00 AM"> 10:00 AM</option>
    <option value="11:00 AM">11:00 AM</option>
    <option value="12:00 PM">12:00 PM</option>
    <option value="01:00 PM"> 01:00 PM</option>
    <option value="02:00 PM"> 02:00 PM </option>
     <option value="03:00 PM"> 03:00 PM </option>
     <option value="04:00 PM">04:00 PM</option>
     <option value="05:00 PM"> 05:00 PM</option>
     <option value="06:00 PM"> 06:00 PM </option>
     <option value="07:00 PM">07:00 PM</option>
     <option value="08:00 PM">  08:00 PM</option>
     <option value="09:00 PM">09:00 PM </option>

  </select>
</div>
  </>
)}
               {/* Payment Section */}

<div className="payment-section">

  <h3>Payment Details</h3>

  <div className="form-group">

    <label>Amount * </label>
   <label>700 </label>


  </div>

  <div className="form-group">

    <label>Cash</label>

    <input
      type="number"
      name="cash"
      placeholder="500"
      value={formData.cash}
      onChange={handlePaymentChange}
    />

    {errors.cash && (
      <p className="error-text">
        {errors.cash}
      </p>
    )}

  </div>

  <div className="form-group">

    <label>UPI</label>

    <input
      type="number"
      name="upi"
      placeholder="200"
      value={formData.upi}
      onChange={handlePaymentChange}
    />

    {errors.upi && (
      <p className="error-text">
        {errors.upi}
      </p>
    )}

  </div>

  <div className="form-group">

    <label>Total</label>

    <input
      type="number"
      value={formData.total}
      readOnly
    />

  </div>

</div>


                    {/* BUTTON */}

           <button type="submit" className="submit-btn"  disabled={loading}>
           {loading ? "Saving..." : "Save Patient"}   
           </button>
          </form>

        </div>

      </div>

    </div>
  );
}