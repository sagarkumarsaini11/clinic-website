import React, { useState } from "react";
import "./AddClinic.css";

export default function AddClinic() {

  const [clinicName, setClinicName] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [gstin, setGstin] = useState("");

  const [logoFile, setLogoFile] = useState(null);
  const [headerFile, setHeaderFile] = useState(null);
  const [footerFile, setFooterFile] = useState(null);
  const [idCardFile, setIdCardFile] = useState(null);

const handleImageChange = (e, setter) => {

  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {
    setter(reader.result);
  };

  reader.readAsDataURL(file);
};

const handleSubmit = (e) => {

  e.preventDefault();

  if (
    !clinicName ||
    !clinicAddress ||
    !contactNo ||
    !email ||
    !doctorName ||
    !registrationNo
  ) {
    alert("Please Fill All Fields");
    return;
  }

  const clinicData = {

    id: Date.now(),

    clinicName,
    clinicAddress,
    contactNo,
    email,
    doctorName,
    registrationNo,
    gstin,

    logoFile,
    headerFile,
    footerFile,
    idCardFile,
  };

  console.log("Clinic Data:");
  console.log(clinicData);

  // SAVE DATA

  const oldClinics =
    JSON.parse(
      localStorage.getItem("clinics")
    ) || [];

  oldClinics.push(clinicData);

  localStorage.setItem(
    "clinics",
    JSON.stringify(oldClinics)
  );

  alert("Clinic Added Successfully");

  // RESET FORM

  setClinicName("");
  setClinicAddress("");
  setContactNo("");
  setEmail("");
  setDoctorName("");
  setRegistrationNo("");
  setGstin("");

  setLogoFile(null);
  setHeaderFile(null);
  setFooterFile(null);
  setIdCardFile(null);

  // REDIRECT

  window.location.href =
    "/previously-added-clinics";
};

  return (

    <div className="container-add-clinic">

      <h1 className="heading-add-clinic">
        ADD NEW CLINIC
      </h1>

      <form onSubmit={handleSubmit}>

        <label className="label-add-clinic">
          Clinic Name
        </label>

        <input
          className="input-add-clinic"
          value={clinicName}
          onChange={(e)=>setClinicName(e.target.value)}
          placeholder="Enter Clinic Name"
        />

        <label className="label-add-clinic">
          Clinic Address
        </label>

        <input
          className="input-add-clinic"
          value={clinicAddress}
          onChange={(e)=>setClinicAddress(e.target.value)}
          placeholder="Enter Address"
        />

        <label className="label-add-clinic">
          Contact No
        </label>

        <input
          className="input-add-clinic"
          value={contactNo}
          onChange={(e)=>setContactNo(e.target.value)}
          placeholder="Enter Contact No"
        />

        <label className="label-add-clinic">
          Email
        </label>

        <input
          className="input-add-clinic"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Enter Email"
        />

        <label className="label-add-clinic">
          Doctor Name
        </label>

        <input
          className="input-add-clinic"
          value={doctorName}
          onChange={(e)=>setDoctorName(e.target.value)}
          placeholder="Enter Doctor Name"
        />

        <label className="label-add-clinic">
          Registration Number
        </label>

        <input
          className="input-add-clinic"
          value={registrationNo}
          onChange={(e)=>setRegistrationNo(e.target.value)}
          placeholder="Enter Registration No"
        />

        <label className="label-add-clinic">
          GSTIN
        </label>

        <input
          className="input-add-clinic"
          value={gstin}
          onChange={(e)=>setGstin(e.target.value)}
          placeholder="Enter GSTIN"
        />

        {/* Logo */}

        <label className="label-add-clinic">
          Upload Logo
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e)=>handleImageChange(e,setLogoFile)}
        />

        {logoFile && (
          <img
            src={logoFile}
            alt=""
            className="preview-image-add-clinic"
          />
        )}

        {/* Header */}

        <label className="label-add-clinic">
          Upload Header
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e)=>handleImageChange(e,setHeaderFile)}
        />

        {headerFile && (
          <img
            src={headerFile}
            alt=""
            className="preview-image-add-clinic"
          />
        )}

        {/* Footer */}

        <label className="label-add-clinic">
          Upload Footer
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e)=>handleImageChange(e,setFooterFile)}
        />

        {footerFile && (
          <img
            src={footerFile}
            alt=""
            className="preview-image-add-clinic"
          />
        )}

        {/* ID Card */}

        <label className="label-add-clinic">
          Upload ID Card
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e)=>handleImageChange(e,setIdCardFile)}
        />

        {idCardFile && (
          <img
            src={idCardFile}
            alt=""
            className="preview-image-add-clinic"
          />
        )}

        <button
          type="submit"
          className="submit-button-add-clinic"
        >
          Submit
        </button>

      </form>

    </div>
  );
}