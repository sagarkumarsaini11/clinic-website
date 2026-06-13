import React, { useState } from "react";
import "./AddClinic.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import SidebarAdmin from "../Sidebar/SibarAdmin";
import { useLocation } from "react-router-dom";


export default function AddClinic() {

const navigate = useNavigate();
const location = useLocation();

const clinicData =
  location.state?.clinic;

const isEdit =
  location.state?.isEdit;

const [clinicName, setClinicName] =
  useState(
    clinicData?.name || ""
  );

const [clinicAddress, setClinicAddress] =
  useState(
    clinicData?.address || ""
  );

const [phoneNo, setPhoneNo] =
  useState(
    clinicData?.phone || ""
  );

const [email, setEmail] =
  useState(
    clinicData?.email || ""
  );

const [doctorName, setDoctorName] =
  useState(
    clinicData?.doctor_name || ""
  );

const [registrationNo, setRegistrationNo] =
  useState(
    clinicData?.state_council_registration_no || ""
  );

const [gstin, setGstin] =
  useState(
    clinicData?.gstin || ""
  );

  const [logoFile, setLogoFile] = useState(null);
  const [headerFile, setHeaderFile] = useState(null);
  const [footerFile, setFooterFile] = useState(null);
  const [idCardFile, setIdCardFile] = useState(null);

  //Image change

const handleImageChange = (e, setter) => {
 
  const file =
    e.target.files[0];

  if (!file) return;

  setter(file);
};
 

//handle Submit

const handleSubmit = async (e) => {

  e.preventDefault();

  if (
    !clinicName ||
    !clinicAddress ||
    !phoneNo ||
    !email ||
    !doctorName ||
    !registrationNo
  ) {
    alert("Please Fill All Fields");
    return;
  }

  try {

    const formData = new FormData();

    formData.append(
      "clinicName",
      clinicName
    );

    formData.append(
      "clinicAddress",
      clinicAddress
    );

    formData.append(
      "PhoneNo",
      phoneNo
    );

    formData.append(
      "email",
      email
    );

    formData.append(
      "doctorName",
      doctorName
    );

    formData.append(
      "registrationNo",
      registrationNo
    );

    formData.append(
      "gstin",
      gstin
    );

    // Images

    if (logoFile) {
      formData.append(
        "logoFile",
        logoFile
      );
    }

    if (headerFile) {
      formData.append(
        "headerFile",
        headerFile
      );
    }

    if (footerFile) {
      formData.append(
        "footerFile",
        footerFile
      );
    }

    if (idCardFile) {
      formData.append(
        "idCardFile",
        idCardFile
      );
    }

   const token = Cookies.get("token");
   console.log ("Token:",token);
  
   // Api Call  
  console.log("========= FORM DATA =========");

for (let pair of formData.entries()) {
  console.log(pair[0], ":", pair[1]);
}
console.log("========= END =========");

let response;

if (isEdit) {

  const formData = new FormData();

  formData.append(
    "clinicName",
    clinicName
  );

  formData.append(
    "clinicAddress",
    clinicAddress
  );

  formData.append(
    "PhoneNo",
    phoneNo
  );

  formData.append(
    "email",
    email
  );

  formData.append(
    "doctorName",
    doctorName
  );

  formData.append(
    "registrationNo",
    registrationNo
  );

  formData.append(
    "gstin",
    gstin
  );

  response = await fetch(
    `https://clinic-backend-5ucx.onrender.com/api/clinics/${clinicData.id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

} else {

  response = await fetch(
    "https://clinic-backend-5ucx.onrender.com/api/clinics",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );
}

    const data =
      await response.json();

    console.log(data);

    if (!response.ok) {

      alert(
        data.message ||
        "Failed to Add Clinic"
      );

      return;
    }

    alert(
  isEdit
    ? "Clinic Updated Successfully"
    : "Clinic Added Successfully"
);

navigate(
  "/previously-added-clinics"
);

  } catch (error) {

    console.log(error);

    alert("Server Error");
  }
};

  return (
<>
<SidebarAdmin/>
    <div className="container-add-clinic">

      <h1 className="heading-add-clinic"> ADD NEW CLINIC</h1>
       
                      {/* Add Clinic Form */}

      <form onSubmit={handleSubmit}>
            
             {/*  Clinic Name*/}

        <label className="label-add-clinic"> Clinic Name</label>  
        <input className="input-add-clinic"
          value={clinicName}
          onChange={(e)=>setClinicName(e.target.value)}
         placeholder="Enter Clinic Name"/>
          
          {/*  Clinic Address*/}

        <label className="label-add-clinic">Clinic Address</label>
        <input  className="input-add-clinic"
          value={clinicAddress}
        onChange={(e)=>setClinicAddress(e.target.value)}
          placeholder="Enter Address"/>
          
                {/*  Phone no*/}

        <label className="label-add-clinic"> Phone No</label>
        <input   className="input-add-clinic"
        value={phoneNo}
        onChange={(e)=>setPhoneNo(e.target.value)}
          placeholder="Enter Phone No" />
          
        
                 {/*  Email*/}
        <label className="label-add-clinic"> Email</label>
        <input className="input-add-clinic"
           value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Enter Email"/>
        

                  {/*  Doctor Name*/}
        <label className="label-add-clinic">Doctor Name</label>
        <input  className="input-add-clinic"
          value={doctorName}
          onChange={(e)=>setDoctorName(e.target.value)}
          placeholder="Enter Doctor Name"/>
        
        
                  {/*  Registration Number*/}
        <label className="label-add-clinic">Registration Number</label>
        <input className="input-add-clinic"
          value={registrationNo}
          onChange={(e)=>setRegistrationNo(e.target.value)}
          placeholder="Enter Registration No"/>
         
        
                 {/*  GSTIN*/}
        <label className="label-add-clinic"> GSTIN </label>
        <input  className="input-add-clinic"
        value={gstin}
          onChange={(e)=>setGstin(e.target.value)}
          placeholder="Enter GSTIN"/>
          

                   {/* Logo */}

        <label className="label-add-clinic"> Upload Logo </label>
        <input type="file"
           accept="image/*"
         onChange={(e)=>handleImageChange(e,setLogoFile)}/>
         
      {logoFile && (
     <img  src={URL.createObjectURL(logoFile)}
       alt="" className="preview-image-add-clinic" />
    )}

            {/* Header File */}

        <label className="label-add-clinic"> Upload Header </label>
        <input  type="file" accept="image/*"
         onChange={(e)=>handleImageChange(e,setHeaderFile)} />
          {headerFile && (
    
        <img src={URL.createObjectURL(headerFile)} alt=""
        className="preview-image-add-clinic" />)}

               {/* Footer file */}

        <label className="label-add-clinic"> Upload Footer </label>
        <input type="file" accept="image/*"
          onChange={(e)=>handleImageChange(e,setFooterFile)} />
         
       {footerFile && (
       <img     src={URL.createObjectURL(footerFile)} alt=""
        className="preview-image-add-clinic"/>)}

                     {/* ID Card */}
        <label className="label-add-clinic">  Upload ID Card </label>
        <input type="file"  accept="image/*" 
          onChange={(e)=>handleImageChange(e,setIdCardFile)}/>

        {idCardFile && (
         <img  src={URL.createObjectURL(idCardFile)} alt=""
            className="preview-image-add-clinic"/>)}
   
  
                {/*Submit button*/}
       <button
  type="submit"
  className="submit-button-add-clinic"
>
  {isEdit
    ? "Update Clinic"
    : "Submit"}
</button>
        
      </form>  
    </div> 
     </>    
  );      
}
      

    
  
