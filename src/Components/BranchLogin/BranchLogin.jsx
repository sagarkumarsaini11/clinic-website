import React, { useState } from "react";
import "./BranchLogin.css";
import { useNavigate } from "react-router-dom";

const BranchLogin = () => {
    const navigate = useNavigate();
    const [loginType, setLoginType] = useState("Admin");
  
  const [showLogin, setShowLogin] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

const handleLogin = (e) => {

  e.preventDefault();

  if (
    !loginData.email ||
    !loginData.password
  ) {
    alert("Please fill all fields");
    return;
  }

  // ADMIN LOGIN

  if (loginType === "Admin") {

    if (
      loginData.email ===
        "admin@gmail.com" &&
      loginData.password ===
        "123456"
    ) {

      setShowLogin(false);

      navigate("/adminpanel");

      return;
    }

    alert("Invalid Admin Login");
    return;
  }

  // CLINIC LOGIN

  if (loginType === "Clinic") {

    if (
      loginData.email ===
        "clinic@gmail.com" &&
      loginData.password ===
        "123456"
    ) {

      setShowLogin(false);

      navigate("/homepage");

      return;
    }

    alert("Invalid Clinic Login");
    return;
  }

  // PATIENT LOGIN

  if (loginType === "Patient") {

    if (
      loginData.email ===
        "patient@gmail.com" &&
      loginData.password ===
        "123456"
    ) {

      setShowLogin(false);

      navigate("/patientdetails");

      return;
    }

    alert("Invalid Patient Login");
  }
};

const handleLoginTypeChange = (e) => {

  setLoginType(e.target.value);

  setLoginData({
    email: "",
    password: "",
  });

};
  return (
    <>
      {/* Navbar Button */}

      <button
        className="branch-btn"
        onClick={() => setShowLogin(true)}> Login </button>
      
      
                     {/* Login Modal */}

      {showLogin && (
        <div className="login-overlay">
          <div className="login-box">

            <button
              className="close-btn"
              onClick={() => setShowLogin(false)}
            >
              ×
            </button>

            <h2>Sign In</h2>

            <div className="radio-group-login">

  <label>
    <input
      type="radio"
      value="Admin"
      checked={loginType === "Admin"}
      onChange={handleLoginTypeChange}
      
    />
    Admin
  </label>

  <label>
    <input
      type="radio"
      value="Clinic"
      checked={loginType === "Clinic"}
       onChange={handleLoginTypeChange}
    />
    Clinic
  </label>

  <label>
    <input
      type="radio"
      value="Patient"
      checked={loginType === "Patient"}
      onChange={handleLoginTypeChange}
    />
    Patient
  </label>

</div>         
                       {/* Form */}

            <form onSubmit={handleLogin}>

              <div className="input-group-login">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={loginData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group-login">
                <label>Password</label>

                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={loginData.password}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="signin-btn"
              >
                Sign In
              </button>

            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BranchLogin;