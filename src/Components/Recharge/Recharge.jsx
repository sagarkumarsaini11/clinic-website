import React, { useState } from "react";
import "./Recharge.css";
import { useNavigate } from "react-router-dom";

const Recharge = () => {

const [rechargeData, setRechargeData] = useState({
  package: "",
  homePhysioPackage: "",
  exercisePlan: false,
  additionalSessions: "",
  amountPaid: "",
});
const navigate = useNavigate();
const handlePackageSelect = (e) => {
  setRechargeData((prev) => ({
    ...prev,
    package: e.target.value,
  }));
};

const handleCheckboxChange = (e) => {
  const { name, checked } = e.target;

  setRechargeData((prev) => ({
    ...prev,
    [name]: checked,
  }));
};

const handleChange = (e) => {
  const { name, value } = e.target;

  setRechargeData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const calculateTotal = () => {
  let total = 0;

  // Package amount
  if (rechargeData.package) {
    const match = rechargeData.package.match(/₹(\d+)/);

    if (match) {
      total += Number(match[1]);
    }
  }


// Home Physiotherapy Package

if (rechargeData.homePhysioPackage) {

  const match =
    rechargeData.homePhysioPackage.match(
      /₹(\d+)/
    );

  if (match) {
    total += Number(match[1]);
  }

}

  // Exercise Plan
  if (rechargeData.exercisePlan) {
    total += 4500;
  }

  // Additional Sessions
  if (rechargeData.additionalSessions) {
    total += Number(rechargeData.additionalSessions) * 250;
  }

  return total;
};

const handleSubmit = (e) => {
  e.preventDefault();

  if (
    !rechargeData.package &&
!rechargeData.homePhysioPackage &&
    !rechargeData.exercisePlan
  ) {
    alert("Please select at least one service");
    return;
  }

  if (!rechargeData.amountPaid) {
    alert("Please enter amount paid");
    return;
  }

  console.log("===== RECHARGE DATA =====");
const finalData = {
  ...rechargeData,
  totalAmount: calculateTotal(),
};

console.table(finalData);

console.log(
  JSON.stringify(finalData, null, 2)
);

  alert("Recharge Submitted Successfully!");

  setRechargeData({
    package: "",
    homePhysio: false,
    exercisePlan: false,
    additionalSessions: "",
    amountPaid: "",
  });
};

  return (

    <div className="recharge-container">
         <button type="button" className="back-btn"onClick={() =>navigate("/homepage", {
      state: {
        openPatientPopup: true,
      },
    })
 }> ←</button>

      <div className="recharge-card">

        <h2> Select Services / Packages</h2>
         
        <form onSubmit={handleSubmit}> 

              {/* Standard Physiotherapy */}

          <div className="package-section standard">
            <h3> Standard Physiotherapy</h3>
              <label>   
              <input  type="radio"  name="package"  value="Standard 1 Session - ₹250"  checked={  rechargeData.package ===
               "Standard 1 Session - ₹250" }
                onChange={ handlePackageSelect }/>
              <span>1 Session</span>  
              <b>₹250</b>
            </label>       
                  
            <label>
             <input type="radio" name="package" value="Standard 5 Sessions - ₹1125"
            checked={  rechargeData.package === "Standard 5 Sessions - ₹1125"}
           onChange={handlePackageSelect}/>
            <span>5 Sessions</span>
            <b>₹1125</b>
              </label>  

             <label>
              <input  type="radio"  name="package"  value="Standard 20 Sessions - ₹4000"    checked={  rechargeData.package ==="Standard 20 Sessions - ₹4000" }onChange={ handlePackageSelect}/>
              <span> 20 Sessions</span>
               <b>₹4000</b>
              </label>
              </div>

                           {/* Advance Physiotherapy */}

          <div className="package-section advance">

            <h3>  Advance Physiotherapy </h3>
             <label>
            <input  type="radio"  name="package" value="Advance 1 Session - ₹350"
            checked={  rechargeData.package ===   "Advance 1 Session - ₹350"}
              onChange={  handlePackageSelect}/>
               <span>1 Session</span>
               <b>₹350</b>
               </label>
 

          <label>
        <input type="radio"  name="package" value="Advance 5 Sessions - ₹1575"
        checked={   rechargeData.package === "Advance 5 Sessions - ₹1575"}
            onChange={handlePackageSelect}/>
        <span>5 Sessions</span>
       <b>₹1575</b>
        </label> 


            <label>
              <input   type="radio"    name="package"   value="Advance 20 Sessions - ₹5600"   checked={  rechargeData.package === "Advance 20 Sessions - ₹5600"}  onChange={  handlePackageSelect} />
              <span> 20 Sessions  </span>
                <b>₹5600</b>
            </label>
           </div>   

                      {/* Home Physiotherapy */}



<div className="package-section home-package">

  <h3>Home Physiotherapy</h3>

  <label>
    <input
      type="radio"
      name="homePhysioPackage"
      value="1 Session - ₹600"
      checked={
        rechargeData.homePhysioPackage ===
        "1 Session - ₹600"
      }
      onChange={handleChange}
    />

    <span>1 Session</span>

    <b>₹600</b>
  </label>

  <label>
    <input
      type="radio"
      name="homePhysioPackage"
      value="5 Sessions - ₹3000"
      checked={
        rechargeData.homePhysioPackage ===
        "5 Sessions - ₹3000"
      }
      onChange={handleChange}
    />

    <span>5 Sessions</span>

    <b>₹3000</b>
  </label>

  <label>
    <input
      type="radio"
      name="homePhysioPackage"
      value="20 Sessions - ₹12000"
      checked={
        rechargeData.homePhysioPackage ===
        "20 Sessions - ₹12000"
      }
      onChange={handleChange}
    />

    <span>20 Sessions</span>

    <b>₹12000</b>
  </label>

</div>

          {/* Exercise Plan */}

     <div className="single-package exercise-package">
      <label>
       <input   type="checkbox"   name="exercisePlan" checked={rechargeData.exercisePlan} onChange={handleCheckboxChange}/>
       <span>Customized Exercise Plan</span>
          <b>₹4500</b>
           </label>
       </div>
    

                       {/* Additional Sessions */}

        <div className="additional-section">
         <h3>Additional Sessions</h3>

          <input type="text"  name="additionalSessions"  value={rechargeData.additionalSessions} onChange={(e) => setRechargeData({
           ...rechargeData,
        additionalSessions: e.target.value, })}  placeholder="Enter No. of Sessions"/>
          <p>₹250 Per Session</p>
        </div>

                 {/* Total Amount */}

        <div className="total-section">

          <label>Total Amount</label>

        <input  type="text"  value={`₹${calculateTotal()}`}  readOnly
         className="total-input"/>
        </div>

               {/* Amount Paid */}

         <div className="amount-section">
           <label>Amount Paid *</label>

       <input type="number" name="amountPaid" min="0" value={rechargeData.amountPaid}
         onChange={(e) => setRechargeData({  ...rechargeData,
           amountPaid: e.target.value,})}  placeholder="Enter Amount Paid"/>
           </div>

          <button  type="submit"  className="submit-recharge-btn">
           Submit Recharge</button>
  
        </form>

      </div>

    </div>
  );
};

export default Recharge;