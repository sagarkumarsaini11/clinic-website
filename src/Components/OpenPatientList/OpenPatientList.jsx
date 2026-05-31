import React, { useState } from "react";

import './OpenPatientList.css'
import { useNavigate } from "react-router-dom";

export default function OpenPatientList() {
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fileNo: "",
    name: "",
    age: "",
    sex: "",
    whatsapp: "",
    balanceSessions: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.fileNo.trim()) {
      newErrors.fileNo = "File Number is required";
    } else if (formData.fileNo.length < 5) {
      newErrors.fileNo = "File Number must be minimum 5 digits";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.age.trim()) {
      newErrors.age = "Age is required";
    }

    if (!formData.sex) {
      newErrors.sex = "Please select gender";
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp Number is required";
    } else if (formData.whatsapp.length !== 10) {
      newErrors.whatsapp =
        "WhatsApp Number must be 10 digits";
    }

    if (!formData.balanceSessions.trim()) {
      newErrors.balanceSessions =
        "Balance Sessions is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("===== OPEN PATIENT FILE =====");
    console.table(formData);
    console.log(formData);

    alert("Patient File Opened Successfully!");

    setFormData({
      fileNo: "",
      name: "",
      age: "",
      sex: "",
      whatsapp: "",
      balanceSessions: "",
    });
  };

  return (
    <div className="patient-file-container">
 

 
  

      <div className="patient-file-card">

        <h2>Open Patient File</h2>

        <form onSubmit={handleSubmit}>

          {/* File Number */}

          <div className="form-group">
            <label>File Number *</label>

            <input
              type="text"
              name="fileNo"
              value={formData.fileNo}
              onChange={handleChange}
              placeholder="Enter File Number"
            />

            {errors.fileNo && (
              <p className="error-text">
                {errors.fileNo}
              </p>
            )}
          </div>

          {/* Name */}

          <div className="form-group">
            <label>Name *</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name"
            />

            {errors.name && (
              <p className="error-text">
                {errors.name}
              </p>
            )}
          </div>

          {/* Age */}

          <div className="form-group">
            <label>Age *</label>

            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter Age"
            />

            {errors.age && (
              <p className="error-text">
                {errors.age}
              </p>
            )}
          </div>

          {/* Sex */}

          <div className="form-group">
            <label>Sex *</label>

            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
            >
              <option value="">
                Select Gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>
            </select>

            {errors.sex && (
              <p className="error-text">
                {errors.sex}
              </p>
            )}
          </div>

          {/* WhatsApp */}

          <div className="form-group">
            <label>WhatsApp Number *</label>

            <input
              type="text"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="Enter WhatsApp Number"
            />

            {errors.whatsapp && (
              <p className="error-text">
                {errors.whatsapp}
              </p>
            )}
          </div>

          {/* Balance Sessions */}

          <div className="form-group">
            <label>Balance Sessions *</label>

            <input
              type="number"
              name="balanceSessions"
              value={formData.balanceSessions}
              onChange={handleChange}
              placeholder="Enter Balance Sessions"
            />

            {errors.balanceSessions && (
              <p className="error-text">
                {errors.balanceSessions}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="submit-btn-file"
          >
            Open Patient File
          </button>

        </form>
      </div>
    </div>
  );
}
