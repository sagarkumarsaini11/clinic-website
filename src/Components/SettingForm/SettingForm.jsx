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


  // Pathology
  cbc: "",
  esr: "",
  crp: "",
 //discount
 discount10Sessions:"",
 discount20Sessions:"",

  // Standard Modalities
thermoTherapy: "",
therapeuticUltrasound: "",
tens: "",


// Advance Modalities
pemf: "",
terahertz: "",


// Therapeutic Services
romExercises: "",
stretchingExercises: "",
strengtheningExercises: "",


// Additional Services
cuppingTherapy: "",
kinesioTaping: "",

});

//popup
const openPopup = (section) => {
  setCurrentSection(section);
  setShowPopup(true);
};

//Add servies function
const addService = () => {
if (
  editingService &&
  editingService.isDefault
) {
  setFormData((prev) => ({
    ...prev,
    [editingService.chargeName]:
      newService.charges,
  }));

  setEditingService(null);

  setNewService({
    serviceName: "",
    charges: "",
  });

  setShowPopup(false);

  return;
}

  if (!newService.serviceName) return;

  const updated = { ...customServices };

  if (editingService) {
    updated[
      editingService.section
    ][editingService.index] = {
      serviceName: newService.serviceName,
      charges: newService.charges,
    };

    setCustomServices(updated);

    setEditingService(null);
  } else {
    updated[currentSection] = [
      ...updated[currentSection],
      {
        serviceName: newService.serviceName,
        charges: newService.charges,
      },
    ];

    setCustomServices(updated);
  }

  setNewService({
    serviceName: "",
    charges: "",
  });

  setShowPopup(false);
};

//remove services
const removeService = (section, index) => {
  const updated = [...customServices[section]];
  updated.splice(index, 1);

  setCustomServices((prev) => ({
    ...prev,
    [section]: updated,
  }));
};


//edit services
const editService = (section, index) => {
  setCurrentSection(section);

  setNewService({
    serviceName:
      customServices[section][index].serviceName,
    charges:
      customServices[section][index].charges,
  });

  setEditingService({
    section,
    index,
  });

  setShowPopup(true);
};


//Update service
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

  // Charges & Discount validation
  if (
    name.includes("Charge") ||
    name === "discount10Sessions" ||
    name === "discount20Sessions"
  ) {
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


//SERIVES ROW
const ServiceRow = ({
  checkboxName,
  chargeName,
  label,
}) => (
  <div className="service-row">

    <label className="service-label">
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

    <div className="service-actions">

      <FaEdit
        className="edit-service"
        onClick={() => {
          setNewService({
            serviceName: label,
            charges:
              formData[chargeName] || "",
          });

          setEditingService({
            checkboxName,
            chargeName,
            isDefault: true,
          });

          setShowPopup(true);
        }}
      />

      <FaTimes
        className="delete-service"
        onClick={() => {
          setFormData((prev) => ({
            ...prev,
            [checkboxName]: false,
            [chargeName]: "",
          }));
        }}
      />

    </div>

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
      
{/* <FaTimes
  className="close-icon-prescription"
  onClick={() =>
    navigate("/homepage", {
      state: {
        openPatientPopup: true,
      },
    })
  }
/> */}
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
      editService("xray", index)
    }
  />

  <FaTimes
    className="delete-service"
    onClick={() =>
      removeService("xray", index)
    }
  />



{showPopup && (
  <div className="popup-overlay">
    <div className="popup-box">

      <h3>
        {editingService
          ? "Edit Service"
          : "Add Service"}
      </h3>

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
          {editingService
            ? "Update"
            : "Add"}
        </button>

        <button
          type="button"
          onClick={() => {
            setShowPopup(false);
            setEditingService(null);

            setNewService({
              serviceName: "",
              charges: "",
            });
          }}
        >
          Cancel
        </button>

      </div>

    </div>
  </div>
)}

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

  <div className="service-actions">

  <FaEdit
    className="edit-service"
    onClick={() =>
      editService("pathology", index)
    }
  />

  <FaTimes
    className="delete-service"
    onClick={() =>
      removeService("pathology", index)
    }
  />

</div>
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
  <label>Customized Home Treatment Plan</label>

  <input type="text" placeholder="Enter Customized Home Treatment Plan"
    name="customizedHomeTreatmentPlan" value={formData.customizedHomeTreatmentPlan}
    onChange={handleChange}/>
  </div>  


            <p className="note">  Charges vary according to patient condition. </p>
            <div className="field">
  <label>
    Discount on 10 Sessions (%)
  </label>

  <input
    type="text"
    placeholder="Enter Discount %"
    name="discount10Sessions"
    value={formData.discount10Sessions}
    onChange={handleChange}
  />
</div>

<div className="field">
  <label>
    Discount on 20 Sessions (%)
  </label>

  <input
    type="text"
    placeholder="Enter Discount %"
    name="discount20Sessions"
    value={formData.discount20Sessions}
    onChange={handleChange}
  />
</div>
      </div>
              
            

              
                          {/* RIGHT SIDE */}

          <div className="right-side">

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

  <div className="service-actions">

  <FaEdit
    className="edit-service"
    onClick={() =>
      editService("standard", index)
    }
  />

  <FaTimes
    className="delete-service"
    onClick={() =>
      removeService("standard", index)
    }
  />

</div>
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

   <div className="service-actions">

  <FaEdit
    className="edit-service"
    onClick={() =>
      editService("advance", index)
    }
  />

  <FaTimes
    className="delete-service"
    onClick={() =>
      removeService("advance", index)
    }
  />

</div>
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

   <div className="service-actions">

  <FaEdit
    className="edit-service"
    onClick={() =>
      editService("therapeutic", index)
    }
  />

  <FaTimes
    className="delete-service"
    onClick={() =>
      removeService("therapeutic", index)
    }
  />

</div>
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
     

   </div> 
  
                     {/* Add On CHECKBOX*/}

           <div>
            <div className="heading-row">
  <h4>Additional Add-On Services</h4>

  <FaPlus  className="plus-icon"  onClick={() => openPopup("addon")} />
  </div>
  
 

                    {/* ADD ON MAP */}
{customServices.addon.map((item, index) => (
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
      editService("addon", index)
    }
  />

  <FaTimes
    className="delete-service"
    onClick={() =>
      removeService("addon", index)
    }
  />

</div>
  </div>
))}

    <ServiceRow checkboxName="cuppingTherapy"  chargeName="cuppingTherapyCharge"
  label="Cupping Therapy - Dry / Wet / Massage"/>


       <ServiceRow  checkboxName="kinesioTaping" chargeName="kinesioTapingCharge"
      label="Kinesio Taping / Pain Patch"/> 

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

      <h3>
        {editingService
          ? "Edit Service"
          : "Add Service"}
      </h3>

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
          {editingService
            ? "Update"
            : "Add"}
        </button>

        <button
          type="button"
          onClick={() => {
            setShowPopup(false);
            setEditingService(null);

            setNewService({
              serviceName: "",
              charges: "",
            });
          }}
        >
          Cancel
        </button>

      </div>

    </div>
  </div>
)}
    </div>
    </>
  );
}