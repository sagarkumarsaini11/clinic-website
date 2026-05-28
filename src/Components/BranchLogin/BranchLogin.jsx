import React, { useState } from "react";
import "./BranchLogin.css";
import { useNavigate } from "react-router-dom";

const BranchLogin = () => {
    const navigate = useNavigate();
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

  if (!loginData.email || !loginData.password) {
    alert("Please fill all fields");
    return;
  }

  const validEmail = "admin@gmail.com";
  const validPassword = "123456";

  if (
    loginData.email === validEmail &&
    loginData.password === validPassword
  ) {
   

    setLoginData({
      email: "",
      password: "",
    });

    setShowLogin(false);

    // Open Homepage
    navigate("/homepage");
  } else {
    alert("Invalid Email or Password");
  }
};

  return (
    <>
      {/* Navbar Button */}

      <button
        className="branch-btn"
        onClick={() => setShowLogin(true)}> Branch Login </button>
      
      
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

            <h2>Branch Sign In</h2>

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