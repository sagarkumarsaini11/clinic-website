import React, { useState } from "react";
import "./BranchLogin.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const BranchLogin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
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

const handleLogin = async (e) => {

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

  try {

    setLoading(true);

    const response = await fetch(
      "https://clinic-backend-5ucx.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      }
    );

    const data = await response.json();

    console.log("Login Response:", data);

    // const newData = data.data

    // console.log("token", data.data.accessToken)

    if (!response.ok) {

      alert(
        data.message || "Login Failed"
      );

      return;
    }

// Get expiry date from API

const expiryDate = new Date(
  data.data.refreshExpiresAt
);

// Store Access Token

Cookies.set(
  "token",
  data.data.accessToken,
  {
    expires: expiryDate,
    secure: true,
    sameSite: "Lax",
  }
);

localStorage

// Store Refresh Token

Cookies.set(
  "refreshToken",
  data.data.refreshToken,
  {
    expires: expiryDate,
    secure: true,
    sameSite: "Lax",
  }
);

// Store User Data

Cookies.set(
  "user",
  JSON.stringify(
    data.data.user
  ),
  {
    expires: expiryDate,
    secure: true,
    sameSite: "Lax",
  }
);

console.log(
  "Token Cookie:",
  Cookies.get("token")
);

console.log(
  "User Cookie:",
  Cookies.get("user")
);

console.log(
  "Expiry Date:",
  expiryDate
);

navigate("/adminpanel");

  } catch (error) {

    console.log(error);

    alert("Server Error");

  } finally {

    setLoading(false);

  }

  return;
}



  // CLINIC LOGIN

 if (loginType === "Clinic") {

  try {

    setLoading(true);

    const response = await fetch(
      "https://clinic-backend-5ucx.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      }
    );

    const data = await response.json();

    console.log("Clinic Login Response:", data);

    if (!response.ok) {

      alert(
        data.message || "Clinic Login Failed"
      );

      return;
    }

    const expiryDate = new Date(
      data.data.refreshExpiresAt
    );

    Cookies.set(
      "token",
      data.data.accessToken,
      {
        expires: expiryDate,
        secure: true,
        sameSite: "Lax",
      }
    );

    Cookies.set(
      "refreshToken",
      data.data.refreshToken,
      {
        expires: expiryDate,
        secure: true,
        sameSite: "Lax",
      }
    );

    Cookies.set(
      "user",
      JSON.stringify(data.data.user),
      {
        expires: expiryDate,
        secure: true,
        sameSite: "Lax",
      }
    );

    console.log(
      "Clinic Token:",
      Cookies.get("token")
    );

    navigate("/homepage");

  } catch (error) {

    console.log(error);

    alert("Server Error");

  } finally {

    setLoading(false);

  }

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

            <button  type="submit"  className="signin-btn" disabled={loading}>
           {loading ? "Loading..." : "Sign In"}
        </button>

            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BranchLogin;