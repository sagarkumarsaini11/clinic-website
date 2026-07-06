import React, { useState } from "react";
import "./AddDoctor.css";

export default function AddDoctor() {
  const [formData, setFormData] = useState({
    doctorName: "",
    mobile: "",
    hospitalName: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Doctor Data:", formData);

    alert("Doctor Added Successfully");

    setFormData({
      doctorName: "",
      mobile: "",
      hospitalName: "",
      address: "",
    });
  };

  return (
    <div className="container-doctor-form">
      <div className="card-doctor-form">
        <h2 className="heading-doctor-form">Add Doctor</h2>

        <form className="form-doctor-form" onSubmit={handleSubmit}>
          <div className="group-doctor-form">
            <label className="label-doctor-form">Doctor Name</label>

            <input
              type="text"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              placeholder="Enter doctor name"
              className="input-doctor-form"
              required
            />
          </div>

          <div className="group-doctor-form">
            <label className="label-doctor-form">Mobile</label>

            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              className="input-doctor-form"
              maxLength="10"
              required
            />
          </div>

          <div className="group-doctor-form">
            <label className="label-doctor-form">Hospital Name</label>

            <input
              type="text"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
              placeholder="Enter hospital name"
              className="input-doctor-form"
              required
            />
          </div>

          <div className="group-doctor-form">
            <label className="label-doctor-form">Address</label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="textarea-doctor-form"
              rows="4"
              required
            />
          </div>

          <button type="submit" className="button-doctor-form">
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
}