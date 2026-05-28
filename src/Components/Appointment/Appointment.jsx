import React, { useState } from "react";
import "./Appointment.css";

const Appointment = () => {

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    address: "",
    problem: "",
  });

  const [errors, setErrors] = useState({});

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

    if (!formData.address.trim()) {
      newErrors.address =
        "Address is required";
    }

    if (!formData.problem.trim()) {
      newErrors.problem =
        "Problem is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log(
      "Appointment Data:",
      formData
    );

    alert(
      "Appointment Submitted Successfully!"
    );

    setFormData({
      name: "",
      age: "",
      gender: "",
      mobile: "",
      address: "",
      problem: "",
    });
  };

  // Cancel

  const handleCancel = () => {

    const confirmCancel =
      window.confirm(
        "Are you sure you want to cancel?"
      );

    if (confirmCancel) {

      setFormData({
        name: "",
        age: "",
        gender: "",
        mobile: "",
        address: "",
        problem: "",
      });

      alert("Appointment Cancelled");
    }
  };

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

          <div className="input-group textarea-group">

            <textarea  rows="3"  name="address"   placeholder=""
             value={formData.address}  onChange={handleChange} />
              <label>Address</label>
               {errors.address && (
              <span className="error">
                {errors.address}
              </span>
            )}

          </div>

          {/* Problem */}

          <div className="input-group textarea-group">

            <textarea  rows="3"  name="problem" placeholder="" value={formData.problem}  onChange={handleChange}  />
            <label>Problem</label> 
              {errors.problem && (
              <span className="error">
                {errors.problem}
              </span>
            )}

          </div>
  
          {/* Buttons */}

          <div className="button-group">

            <button  type="button"  className="cancel-btn"   onClick={handleCancel}> Cancel </button>
          <button  type="submit"  className="submit-btn-appointment">
            Add Appointment</button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default Appointment;