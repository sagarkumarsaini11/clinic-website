import React, { useState } from "react";
import "./Appointment.css";

const Appointment = () => {

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);
  // Handle Input Change

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Validation

  const validateForm = () => {

    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (formData.mobile.length !== 10) {
      newErrors.mobile =
        "Mobile number must be 10 digits";
    }

if (!formData.appointmentDate) {
  newErrors.appointmentDate = "Date is required";
}

if (!formData.appointmentTime) {
  newErrors.appointmentTime = "Time is required";
}
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit

const handleSubmit = async (e) => {

  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  try {

    setLoading(true);
    console.log("Sending data:", formData)

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

    if (response.ok) {

      console.log("Appointment Created:", data);

      alert("Appointment Submitted Successfully!");

      setFormData({
        name: "",
        age: "",
        gender: "",
        mobile: "",
        appointmentDate: "",
    appointmentTime: "",
      });

    } else {

      alert(
        data.message ||
        "Failed to create appointment"
      );
    }

  } catch (error) {

    console.error("API Error:", error);

    alert(
      "Something went wrong. Please try again."
    );

  } finally {

    setLoading(false);
  }
};

  // // Cancel

  // const handleCancel = () => {

  //   const confirmCancel =
  //     window.confirm(
  //       "Are you sure you want to cancel?"
  //     );

  //   if (confirmCancel) {

  //     setFormData({
  //       name: "",
  //       age: "",
  //       gender: "",
  //       mobile: "",
  //       address: "",
  //       problem: "",
  //     });

  //     alert("Appointment Cancelled");
  //   }
  // };

  return (

    <div
      className="appointment-container" id="appointment">
    
      <div className="appointment-form">

        <h2>Book Appointment</h2>

        <form onSubmit={handleSubmit}>

          {/* Name */}

          <div className="input-group">

            <input   type="text"  name="name"  placeholder=""  value={formData.name} onChange={handleChange} />
            <label>Name</label>
             {errors.name && (
              <span className="error">
                {errors.name}
              </span>
            )}

          </div>

                     {/* Age */}

          <div className="input-group">

            <input  type="number" name="age"  placeholder=""  value={formData.age}
              onChange={handleChange}/>
             <label>Age</label>
              {errors.age && (
              <span className="error">
                {errors.age}
              </span>
            )}

          </div>
                    
                      {/* Gender */}

          <div className="input-group">

            <select  name="gender"  placeholder=""  value={formData.gender}
               onChange={handleChange}>
               <option value="" disabled hidden></option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <label className="select-label-gender"> Gender</label>
             {errors.gender && (
              <span className="error">
                {errors.gender}
              </span>
            )}

          </div>
                  
                    {/* Mobile */}

          <div className="input-group">

            <input  type="tel"  name="mobile"  placeholder=""
              maxLength="10" value={formData.mobile} onChange={handleChange}/>
            <label>Mobile Number</label>
             {errors.mobile && (
              <span className="error">
                {errors.mobile}
              </span>
            )}

          </div>
          
                 {/* Address */}

        <div className="input-group">

  <input
    type="date"
    name="appointmentDate"
    value={formData.appointmentDate}
    onChange={handleChange}
  />

  <label className="date-label">
    Appointment Date
  </label>

  {errors.appointmentDate && (
    <span className="error">
      {errors.appointmentDate}
    </span>
  )}

</div>

                  {/* Problem */}

        <div className="input-group">

  <input
    type="time"
    name="appointmentTime"
    value={formData.appointmentTime}
    onChange={handleChange}
  />

  <label className="date-label">
    Appointment Time
  </label>

  {errors.appointmentTime && (
    <span className="error">
      {errors.appointmentTime}
    </span>
  )}

</div>
  
          {/* Buttons */}

          <div className="button-group">

            {/* <button  type="button"  className="cancel-btn"   onClick={handleCancel}> Cancel </button> */}
    
      <button  type="submit"  className="submit-btn-appointment"  disabled=       {loading}>
         {loading ? "Submitting...": "SUBMIT"}
       </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default Appointment;