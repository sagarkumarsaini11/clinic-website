import React, { useState } from "react";
import './AddPatientForm.css'

export default function AddPatientForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    address: "",
    problem: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name.trim() ||
      !formData.age.trim() ||
      !formData.gender.trim() ||
      !formData.mobile.trim() ||
      !formData.address.trim() ||
      !formData.problem.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (formData.mobile.length !== 10) {
      alert("Mobile number must be 10 digits.");
      return;
    }

    console.log("===== PATIENT DATA =====");
    console.table(formData);
    console.log(formData);

    alert("Patient Added Successfully!");

    setFormData({
      name: "",
      age: "",
      gender: "",
      mobile: "",
      address: "",
      problem: "",
    });
  };

  return (
    <div className="patient-container">
      <div className="patient-card">
        <h2>Add Patient</h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label>
              Name <span>*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Patient Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Age */}
          <div className="form-group">
            <label>
              Age <span>*</span>
            </label>
            <input
              type="number"
              name="age"
              placeholder="Enter Age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          {/* Gender */}
          <div className="form-group">
            <label>
              Gender <span>*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Mobile */}
          <div className="form-group">
            <label>
              Mobile Number <span>*</span>
            </label>
            <input
              type="tel"
              name="mobile"
              placeholder="Enter Mobile Number"
              maxLength="10"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          {/* Address */}
          <div className="form-group">
            <label>
              Address <span>*</span>
            </label>
            <textarea
              name="address"
              rows="3"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Problem */}
          <div className="form-group">
            <label>
              Problem <span>*</span>
            </label>
            <textarea
              name="problem"
              rows="4"
              placeholder="Describe Patient Problem"
              value={formData.problem}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Save Patient
          </button>
        </form>
      </div>
    </div>
  );
}