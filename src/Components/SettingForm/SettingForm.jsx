import React, { useState } from "react";
import "./SettingForm.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTimes, FaPlus, FaEdit} from "react-icons/fa";


export default function PrescriptionForm() {
 const navigate = useNavigate();
const location = useLocation();

//popup and new service OpenPopup()
 const [showPopup, setShowPopup] = useState(false);
const [currentSection, setCurrentSection] = useState("");

const [newService, setNewService] = useState({
  serviceName: "",
  charges: "",
});

const [customServices, setCustomServices] = useState({
  xray: [],
  pathology: [],
  standard: [],
  advance: [],
  therapeutic: [],
  addon: [],
});

const [editingService, setEditingService] =
  useState(null);

const [editData, setEditData] = useState({
  serviceName: "",
  charges: "",
});


const [formData, setFormData] = useState({

  // Treatment
  frequency: "",
  duration: "",
  treatmentDurationNote: "",
  standardPhysioAtHome: "",
  customizedHomeTreatmentPlan: "",

  // X-Ray
  cervicalSpine:"",
  lumbarSpine: "",
  thoracicSpine: "",
  wholeSpine: "",
  xrayOther: "",

  // Pathology
  cbc: "",
  esr: "",
  crp: "",
  uricAcid: "",
  raFactor: "",
  anaElisa: "",
  hlaB27: "",
  rbs: "",
  hbA1c: "",
  vitaminD25Hydroxy: "",
  vitaminB12: "",
  urineExamination: "",
  electrolyteProfile: "",
  tft: "",
  lft: "",
  kft: "",
  lipidProfile: "",
  pathologyOther: "",

  // Standard Modalities
thermoTherapy: "",
therapeuticUltrasound: "",
tens: "",
ift: "",
rct: "",
nmes: "",
traction: "",
cpm: "",
electroMassage: "",
paraffinWax: "",
irrBulb: "",

// Advance Modalities
pemf: "",
terahertz: "",
shockwave: "",
laserTherapy: "",
pmst: "",

// Therapeutic Services
romExercises: "",
stretchingExercises: "",
strengtheningExercises: "",
functionalMobility: "",
injuryPrevention: "",
spineCurveRestoration: "",
scoliosisCorrection: "",
deformityCorrection: "",
facialExercises: "",
postureBalanceGait: "",
mfrIastmJoint: "",

// Additional Services
cuppingTherapy: "",
kinesioTaping: "",
splintingSupportive: "",
coldCompression: "",
personalizedHomeTreatment: "",
});

//popup
const openPopup = (section) => {
  setCurrentSection(section);
  setShowPopup(true);
};

const addService = () => {
  if (!newService.serviceName) return;

  setCustomServices((prev) => ({
    ...prev,
    [currentSection]: [
      ...prev[currentSection],
      {
        serviceName: newService.serviceName,
        charges: newService.charges,
      },
    ],
  }));

  setNewService({
    serviceName: "",
    charges: "",
  });

  setShowPopup(false);
};

const removeService = (section, index) => {
  const updated = [...customServices[section]];
  updated.splice(index, 1);

  setCustomServices((prev) => ({
    ...prev,
    [section]: updated,
  }));
};
//edit services
const editService = (
  section,
  index
) => {
  setEditingService({
    section,
    index,
  });

  setEditData({
    serviceName:
      customServices[section][index]
        .serviceName,

    charges:
      customServices[section][index]
        .charges,
  });
};

const updateService = () => {
  const updated = {
    ...customServices,
  };

  updated[
    editingService.section
  ][editingService.index] = {
    serviceName:
      editData.serviceName,

    charges:
      editData.charges,
  };

  setCustomServices(updated);

  setEditingService(null);
};
//handle change

const handleChange = (e) => {
  const { name, value, checked, type } = e.target;

  // Charge fields validation
  if (name.includes("Charge")) {
    if (
      value === "" ||
      /^\d*\.?\d{0,2}$/.test(value)
    ) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    return;
  }

  setFormData((prev) => ({
    ...prev,
    [name]:
      type === "checkbox"
        ? checked
        : value,
  }));
};

const ServiceRow = ({
  checkboxName,
  chargeName,
  label,
}) => (
  <div className="service-row">
    <label>
      <input
        type="checkbox"
        name={checkboxName}
        checked={formData[checkboxName]}
        onChange={handleChange}
      />
      {label}
    </label>

    <input
      type="text"
      className="charge-input"
      placeholder="₹ Charges"
      name={chargeName}
      value={formData[chargeName] || ""}
      onChange={handleChange}
    />
  </div>
);
//handle submit

  const handleSubmit = (e) => {
  e.preventDefault();

  console.log(
    "========== PRESCRIPTION DATA =========="
  );

  console.table(formData);

  console.log(
    JSON.stringify(formData, null, 2)
  );

  alert("Prescription Saved Successfully");
};



  return (
    <>
   
    
    <div className="prescription-container">
      
<FaTimes
  className="close-icon-prescription"
  onClick={() =>
    navigate("/homepage", {
      state: {
        openPatientPopup: true,
      },
    })
  }
/>
      <h1>SETTING THERAPY PRESCRIPTION</h1>
        
       <form onSubmit={handleSubmit}>
       <div className="top-section">

                           {/* LEFT SIDE */}

          <div className="left-side">
            <h3>Inv. Req.</h3>

                       {/* X-RAY */}

           <div className="heading-row">
  <h4>X-Ray</h4>

  <FaPlus
    className="plus-icon"
    onClick={() => openPopup("xray")}
  />
</div>

            {/* X_RAY MAP */}

{customServices.xray.map((item, index) => (
  <div className="custom-service" key={index}>
    <label>
      <input type="checkbox" />
      {item.serviceName}
    </label>

    <span>₹ {item.charges}</span>

   <div className="service-actions">

  <FaEdit
    className="edit-service"
    onClick={() =>
      editService(
        "xray",
        index
      )
    }
  />

  <FaTimes
    className="delete-service"
    onClick={() =>
      removeService(
        "xray",
        index
      )
    }
  />

</div>
  </div>
))}

<ServiceRow
  checkboxName="cervicalSpine"
  chargeName="cervicalSpineCharge"
  label="Cervical Spine - AP./Lat. View"
 
/> 
   

         <ServiceRow
  checkboxName="lumbarSpine"
  chargeName="lumbarSpineCharge"
  label="Lumbar Spine - AP./Lat. View"
/>
  
      <ServiceRow
  checkboxName="lumbarSpine"
  chargeName="lumbarSpineCharge"
  label="Lumbar Spine - AP./Lat. View"
/>  
  

      <ServiceRow
  checkboxName="wholeSpine"
  chargeName="wholeSpineCharge"
  label="Whole Spine - AP./Lat. View"
/>

   
  
        <ServiceRow
  checkboxName="xrayOther"
  chargeName="xrayOtherCharge"
  label="Other"
/> 
         <hr />
    
                     {/* X-RAY & CT SCAN CALL */}

            <p> <b>For X-Ray & CT Scan Call</b> </p>
            <p> Advance X-Ray Lab:9675691004</p>
             
                       {/* Pathology Checkbox */}

               <div className="heading-row">
  <h4>Pathology</h4>

  <FaPlus
    className="plus-icon"
    onClick={() => openPopup("pathology")}
  />
</div>

{/* PATHOLOGY MAP */}
{customServices.pathology.map((item, index) => (
  <div className="custom-service" key={index}>
    <label>
      <input type="checkbox" />
      {item.serviceName}
    </label>

    <span>₹ {item.charges}</span>

    <FaTimes
      className="delete-service"
      onClick={() =>
        removeService("pathology", index)
      }
    />
  </div>
))}

           <ServiceRow
  checkboxName="cbc"
  chargeName="cbcCharge"
  label="CBC"
/>
   

          <ServiceRow
  checkboxName="esr"
  chargeName="esrCharge"
  label="ESR"
/>
   
   
      <ServiceRow
  checkboxName="crp"
  chargeName="crpCharge"
  label="CRP"
/>
  

       <ServiceRow
  checkboxName="uricAcid"
  chargeName="uricAcidCharge"
  label="Uric Acid"
/>
   
     <ServiceRow
  checkboxName="raFactor"
  chargeName="raFactorCharge"
  label="RA Factor"
/> 
   

   <ServiceRow
  checkboxName="anaElisa"
  chargeName="anaElisaCharge"
  label="ANA Elisa"
/> 
  
    
    <ServiceRow
  checkboxName="hlaB27"
  chargeName="hlaB27Charge"
  label="HLA B27"
/>   
   

   <ServiceRow
  checkboxName="rbs"
  chargeName="rbsCharge"
  label="RBS"
/>  
   
  
      <ServiceRow
  checkboxName="hbA1c"
  chargeName="hbA1cCharge"
  label="HbA1c"
/>
   
      <ServiceRow
  checkboxName="vitaminD25Hydroxy"
  chargeName="vitaminD25HydroxyCharge"
  label="Vitamin D25 Hydroxy"
/>
  
     <ServiceRow
  checkboxName="vitaminB12"
  chargeName="vitaminB12Charge"
  label="Vitamin B12"
/>

      <ServiceRow
  checkboxName="urineExamination"
  chargeName="urineExaminationCharge"
  label="Urine Examination"
/>  
  
      <ServiceRow
  checkboxName="electrolyteProfile"
  chargeName="electrolyteProfileCharge"
  label="Electrolyte Profile"
/>  
   
     <ServiceRow
  checkboxName="tft"
  chargeName="tftCharge"
  label="TFT (Thyroid)"
/>


     <ServiceRow
  checkboxName="lft"
  chargeName="lftCharge"
  label="LFT (Liver)"
/>  
  
    <ServiceRow
  checkboxName="kft"
  chargeName="kftCharge"
  label="KFT (Kidney)"
/>
  
  <ServiceRow
  checkboxName="lipidProfile"
  chargeName="lipidProfileCharge"
  label="Lipid Profile"/>  

   

     <ServiceRow
  checkboxName="pathologyOther"
  chargeName="pathologyOtherCharge"
  label="Other"/>
   
    
<hr />
  
                    {/* Samole Collection Contact */}

            <p><b> For Sample Collection Call</b> </p>
            <p> Mr. Abhay Gothwal </p>
            <p> 7055360155</p>
             
                   {/* Sample Collection Contact */}
            <h4>  On-Site Treatment Charges </h4>
            <table>
              <thead>
                <tr>
                  <th>Sessions</th>
                  <th>Standard</th>
                  <th>Advance</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>1</td>
                  <td>300</td>
                  <td>450</td>
                </tr>

                <tr>
                  <td>5</td>
                  <td>1380</td>
                  <td>2025</td>
                </tr>

                <tr>
                  <td>20</td>
                  <td>4800</td>
                  <td>6300</td>
                </tr>
              </tbody>
            </table>

             {/* Standard Physio at Home */}

            <div className="field">
              <label>Standard Physio at Home</label>
              <input type="text" placeholder="750"  name="standardPhysioAtHome" value={formData.standardPhysioAtHome} onChange={handleChange}  />
               </div> 
               
             
              {/*  Customized Home Treatment Plan */}

            <div className="field">
              <label> Customized Home Treatment Plan</label>
                <textarea rows="3" name="customizedHomeTreatmentPlan" value={formData.customizedHomeTreatmentPlan} onChange={handleChange} />
             </div>  

            <p className="note">  Charges vary according to patient condition. </p>
      </div>
              
                          {/* RIGHT SIDE */}

          <div className="right-side">

                    {/* NAME */}
          

                 {/* AGE */}
           

                {/* GENDER */}
           
            
                   {/* ADDRESS */}
          
                
                 {/*DATE & TIME */}
             
             
                    {/* C/CO*/}
            

                    {/* OTHER DETAILS */}
                  
           

                    {/* EXAMINATION */}
              
            

                    {/*IN Inv  */}
           
            
                    {/*DIAGNOSIS  */}
                    
         
                  
                    {/*ADVICE  */}

           
                 
                    {/*Physiotherapy Rx CHECKBOX  */}

       <div className="heading-row">
      <h4>Pathology RX</h4>
       </div>

            <div className="checkbox-sections">

                        {/* Standard Modalities */}

            <div>
      <div className="heading-row">
  <h4>Standard Treatment Modalities</h4>

  <FaPlus
    className="plus-icon"
    onClick={() => openPopup("standard")}
  />
</div>

{/* STANDARD MAP */}
{customServices.standard.map((item, index) => (
  <div className="custom-service" key={index}>
    <label>
      <input type="checkbox" />
      {item.serviceName}
    </label>

    <span>₹ {item.charges}</span>

    <FaTimes
      className="delete-service"
      onClick={() =>
        removeService("standard", index)
      }
    />
  </div>
))}

    <ServiceRow
  checkboxName="thermoTherapy"
  chargeName="thermoTherapyCharge"
  label="ThermoTherapy Hot / Cold"
/>
     
    <ServiceRow
  checkboxName="therapeuticUltrasound"
  chargeName="therapeuticUltrasoundCharge"
  label="Therapeutic Ultrasound (US)"
/> 

      <ServiceRow
  checkboxName="tens"
  chargeName="tensCharge"
  label="Nerve Stimulation (TENS)"
/> 

       <ServiceRow
  checkboxName="ift"
  chargeName="iftCharge"
  label="Interferential Therapy (IFT)"
/> 
  

      <ServiceRow
  checkboxName="rct"
  chargeName="rctCharge"
  label="Russian Current Therapy (RCT)"
/> 
    
     <ServiceRow
  checkboxName="nmes"
  chargeName="nmesCharge"
  label="Muscular Stimulation (NMES)"
/>  
  
     <ServiceRow
  checkboxName="traction"
  chargeName="tractionCharge"
  label="Traction Cervical / Lumbar / Knee"
/>   
     
     <ServiceRow
  checkboxName="cpm"
  chargeName="cpmCharge"
  label="Continuous Passive Motion (CPM) - Knee"
/>
    
         <ServiceRow
  checkboxName="electroMassage"
  chargeName="electroMassageCharge"
  label="Electro Massage - Thera Gun / G-10"
/> 

        <ServiceRow
  checkboxName="paraffinWax"
  chargeName="paraffinWaxCharge"
  label="Paraffin Wax Therapy"
/>
 
    
        <ServiceRow
  checkboxName="irrBulb"
  chargeName="irrBulbCharge"
  label="IRR Bulb Therapy"
/>
         </div>
    
                         {/* Advance Modalities */}

           <div>
           <div className="heading-row">
  <h4>Advance Treatment Modalities</h4>

  <FaPlus
    className="plus-icon"
    onClick={() => openPopup("advance")}
  />
</div>

{/* ADVANCED MAP */}
{customServices.advance.map((item, index) => (
  <div className="custom-service" key={index}>
    <label>
      <input type="checkbox" />
      {item.serviceName}
    </label>

    <span>₹ {item.charges}</span>

    <FaTimes
      className="delete-service"
      onClick={() =>
        removeService("advance", index)
      }
    />
  </div>
))}

       <ServiceRow
  checkboxName="pemf"
  chargeName="pemfCharge"
  label="Pulsed Electro Magnetic Field (PEMF)"
/>
 
     
         <ServiceRow
  checkboxName="terahertz"
  chargeName="terahertzCharge"
  label="Terahertz Therapy (THz)"
/> 
    
         <ServiceRow
  checkboxName="shockwave"
  chargeName="shockwaveCharge"
  label="Shockwave Therapy (ESWT)"
/>
    
       <ServiceRow
  checkboxName="laserTherapy"
  chargeName="laserTherapyCharge"
  label="LASER Therapy - Class III (LLLT)"
/>   
  
       <ServiceRow
  checkboxName="pmst"
  chargeName="pmstCharge"
  label="Physio Magneto (PMST with NRIS)"
/>    
  </div>   
    
                       {/* Therapeutic CHECKBOX*/}

              <div>
        <div className="heading-row">
  <h4>Therapeutic Services</h4>

  <FaPlus
    className="plus-icon"
    onClick={() => openPopup("therapeutic")}
  />
</div>
{/* THERAP. MAP */}
{customServices.therapeutic.map((item, index) => (
  <div className="custom-service" key={index}>
    <label>
      <input type="checkbox" />
      {item.serviceName}
    </label>

    <span>₹ {item.charges}</span>

    <FaTimes
      className="delete-service"
      onClick={() =>
        removeService("therapeutic", index)
      }
    />
  </div>
))}
      <ServiceRow
  checkboxName="romExercises"
  chargeName="romExercisesCharge"
  label="ROM Exercises"
/>   
  
       <ServiceRow
  checkboxName="stretchingExercises"
  chargeName="stretchingExercisesCharge"
  label="Stretching Exercises"
/> 
    
        <ServiceRow
  checkboxName="strengtheningExercises"
  chargeName="strengtheningExercisesCharge"
  label="Strengthening Exercises"
/> 
     
    <ServiceRow
  checkboxName="functionalMobility"
  chargeName="functionalMobilityCharge"
  label="Functional Mobility Training"
/> 
  
    <ServiceRow
  checkboxName="injuryPrevention"
  chargeName="injuryPreventionCharge"
  label="Injury Prevention Training"
/>  
  
       <ServiceRow
  checkboxName="spineCurveRestoration"
  chargeName="spineCurveRestorationCharge"
  label="Spine Curve Restoration"
/>
    
    <ServiceRow
  checkboxName="scoliosisCorrection"
  chargeName="scoliosisCorrectionCharge"
  label="Scoliosis Correction"
/>
  
   <ServiceRow
  checkboxName="deformityCorrection"
  chargeName="deformityCorrectionCharge"
  label="Deformity Correction"
/>  


       <ServiceRow
  checkboxName="facialExercises"
  chargeName="facialExercisesCharge"
  label="Facial Exercises"
/>
    
       <ServiceRow
  checkboxName="postureBalanceGait"
  chargeName="postureBalanceGaitCharge"
  label="Posture / Balance / Gait Training"
/>  
     
     <ServiceRow
  checkboxName="mfrIastmJoint"
  chargeName="mfrIastmJointCharge"
  label="MFR / IASTM / Joint Mobilization"
/>
   </div> 
  
                     {/* Add On CHECKBOX*/}

           <div>
            <div className="heading-row">
  <h4>Additional Add-On Services</h4>

  <FaPlus
    className="plus-icon"
    onClick={() => openPopup("addon")}
  />
</div>
{/* ADD ON MAP */}
{customServices.addon.map((item, index) => (
  <div className="custom-service" key={index}>
    <label>
      <input type="checkbox" />
      {item.serviceName}
    </label>

    <span>₹ {item.charges}</span>

    <FaTimes
      className="delete-service"
      onClick={() =>
        removeService("addon", index)
      }
    />
  </div>
))}

    <ServiceRow
  checkboxName="cuppingTherapy"
  chargeName="cuppingTherapyCharge"
  label="Cupping Therapy - Dry / Wet / Massage"
/> 

       <ServiceRow
  checkboxName="kinesioTaping"
  chargeName="kinesioTapingCharge"
  label="Kinesio Taping / Pain Patch"
/>  

       <ServiceRow
  checkboxName="splintingSupportive"
  chargeName="splintingSupportiveCharge"
  label="Splinting Supportive / Corrective"
/>   
    
    <ServiceRow
  checkboxName="coldCompression"
  chargeName="coldCompressionCharge"
  label="Cold Compression Therapy (Cryotherapy)"
/> 
     
    <ServiceRow
  checkboxName="personalizedHomeTreatment"
  chargeName="personalizedHomeTreatmentCharge"
  label="Personalized Home Treatment Plan"
/>
     </div>
</div>  
   
                        {/*Frequency Input*/}

            <div className="bottom-box">
              <div>
                <label> Frequency  </label>
                <input placeholder="5-6 times/week" name="frequency" value={formData.frequency} onChange={handleChange} />
              </div>    
              
              <div>
                <label>  Duration  </label>
                <input placeholder="4 weeks" name="duration" value={formData.duration} onChange={handleChange} />
              </div>   
            </div>   
            
            <div className="field">
              <label> Treatment Duration Note </label>
           <textarea rows="2" name="treatmentDurationNote" value={formData.treatmentDurationNote}  onChange={handleChange}
            placeholder="Treatment duration mentioned above is approximate & subject to change."/>
          </div>

            <button  type="submit"  className="save-btn" >
            Save Prescription
             </button>
           </div>   
           </div>
       </form>

       {/* show popup  */}
       {showPopup && (
  <div className="popup-overlay">
    <div className="popup-box">

      <h3>Add Service</h3>

      <input
        type="text"
        placeholder="Service Name"
        value={newService.serviceName}
        onChange={(e) =>
          setNewService({
            ...newService,
            serviceName: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Charges"
        value={newService.charges}
        onChange={(e) =>
          setNewService({
            ...newService,
            charges: e.target.value,
          })
        }
      />

      <div className="popup-btns">

        <button
          type="button"
          onClick={addService}
        >
          Add
        </button>

        <button
          type="button"
          onClick={() =>
            setShowPopup(false)
          }
        >
          Remove
        </button>

        {/* //edit function */}
        {editingService && (
  <div className="popup-overlay">
    <div className="popup-box">

      <h3>Edit Service</h3>

      <input
        type="text"
        value={editData.serviceName}
        onChange={(e) =>
          setEditData({
            ...editData,
            serviceName:
              e.target.value,
          })
        }
      />

      <input
        type="text"
        value={editData.charges}
        onChange={(e) =>
          setEditData({
            ...editData,
            charges:
              e.target.value,
          })
        }
      />

      <div className="popup-btns">

        <button
          type="button"
          onClick={updateService}
        >
          Update
        </button>

        <button
          type="button"
          onClick={() =>
            setEditingService(
              null
            )
          }
        >
          Cancel
        </button>

      </div>

    </div>
  </div>
)}

      </div>

    </div>
  </div>
)}
    </div>
    </>
  );
}