import React, { useState } from "react";
import './Appointment.css'

const Appointment = () => {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    address: "",
    problem: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, age, gender, mobile, problem } = formData;

    if (!name || !age || !gender || !mobile || !problem) {
      alert("Please fill all required fields.");
      return;
    }

    console.log("Appointment Data:", formData);

    alert("Appointment Submitted Successfully!");

    setFormData({
      name: "",
      age: "",
      gender: "",
      mobile: "",
      address: "",
      problem: "",
    });

    setShowForm(false);
  };


  const handleCancel = () => {
  const confirmClose = window.confirm(
    "Are you sure you want to cancel this appointment?"
  );

  if (confirmClose) {
    setShowForm(false);
  }
};

  return (
    <div className="appointment-container">

    <div id="appointment-section" className="appointment-container">

  <button  className="appointment-btn"  onClick={() => setShowForm(true)} id="appointment" >
      Add Appointment
   </button>
 
      {showForm && (
        <div className="modal-overlay">
          <div className="appointment-form">
         <div className="form-header">
            <h2>Add Appointment</h2>

          <button type="button"  className="close-btn"  
            onClick={() => setShowForm(false)} > ✖
             </button>
            </div>
  
            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Name *</label>
                <input type="text" name="name"  value={formData.name}
                  onChange={handleChange} />
                </div>  

              <div className="form-group">
                <label>Age *</label>
                <input type="number" name="age"  value={formData.age}
                  onChange={handleChange}/>
               </div>  

              <div className="form-group">
                <label>Gender *</label>
                <select  name="gender" value={formData.gender}
                  onChange={handleChange}>
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Mobile No *</label>
                <input type="tel"  name="mobile"  value={formData.mobile}
                  onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Address</label>
                <textarea rows="3"   name="address"  value={formData.address}
                   onChange={handleChange}   />
               </div> 
                
              <div className="form-group">
                <label>Problem *</label>
                <textarea  rows="3"  name="problem"  value={formData.problem}
                  onChange={handleChange}  />
              </div>   

              <div className="button-group">
               <button  type="button"  className="cancel-btn"  onClick={handleCancel}>  Cancel</button>

                <button  type="submit"  className="submit-btn">
                 Submit
                 </button>                 
               
              </div>

            </form>
          </div>

        </div>
      )}

    </div>
     </div>
   
  );
};

export default Appointment;