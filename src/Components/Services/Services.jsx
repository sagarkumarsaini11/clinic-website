import React, { useState } from "react";
import "./Services.css";
import Sidebar from "../Sidebar/Sidebar";

export default function Services() {

  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
    serviceName: "",
    standardRecharge: "",
    serviceType: "",
    advancedRecharge: "",
    priceSubCategory: "",
    status:"",
  });

  const [services, setServices] = useState([]);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {

    const { name, value } = e.target;

    if (
      name === "standardRecharge" ||
      name === "advancedRecharge" ||
      name === "priceSubCategory"
    ) {

      if (
        value === "" ||
        /^\d+(\.\d{0,2})?$/.test(value)
      ) {
        setFormData({
          ...formData,
          [name]: value,
        });
      }

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {

    let newErrors = {};

    if (!formData.category)
      newErrors.category =
        "Category Required";

    if (!formData.subCategory)
      newErrors.subCategory =
        "Sub Category Required";

    if (!formData.serviceName.trim())
      newErrors.serviceName =
        "Service Name Required";

    if (
      formData.serviceName.length > 100
    )
      newErrors.serviceName =
        "Maximum 100 Characters";

    if (!formData.standardRecharge)
      newErrors.standardRecharge =
        "Standard Recharge Required";

    if (!formData.serviceType)
      newErrors.serviceType =
        "Select Service Type";

    if (!formData.advancedRecharge)
      newErrors.advancedRecharge =
        "Advanced Recharge Required";

    if (!formData.priceSubCategory)
      newErrors.priceSubCategory =
        "Prize Sub Category Required";

      if (!formData.status)
      newErrors.status =
        "Select Status";

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    const newService = {
      id: editId || Date.now(),
      ...formData,
    };

    if (editId) {

      setServices(
        services.map((item) =>
          item.id === editId
            ? newService
            : item
        )
      );

      setEditId(null);

    } else {

      setServices([
        ...services,
        newService,
      ]);
    }

    console.log(newService);

    setFormData({
      category: "",
      subCategory: "",
      serviceName: "",
      standardRecharge: "",
      serviceType: "",
      advancedRecharge: "",
      priceSubCategory: "",
      status:"",
    });

    setErrors({});
  };

  const handleEdit = (item) => {

    setFormData(item);

    setEditId(item.id);
  };

  const handleDelete = (id) => {

    setServices(
      services.filter(
        (item) => item.id !== id
      )
    );
  };

  return (<>
    <Sidebar/>
    <div className="service-page">

      <div className="service-form">

        <h2>Services</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group-services">
            <label>Category</label>

            <select  name="category" value={formData.category} onChange={handleChange}>

              <option value="">Select Category</option>
              <option> Category A</option>
              <option>Category B</option>
              <option>Category C</option> 
            </select>

            <p className="error-services">{errors.category} </p>
          </div>    
          
          <div className="form-group-services">
            <label>Sub Category</label>
 
            <select  name="subCategory" value={formData.subCategory }
            onChange={handleChange}>
            <option value="">  Select Sub Category</option>

              <option> Category A </option>
              <option> Category B</option>
              <option>Category C </option></select>

            <p className="error-services">{errors.subCategory}   </p>
          </div>    
         

          <div className="form-group-services">
            <label>Service Name</label>
              
            <input type="text" maxLength="100" name="serviceName"
             value={  formData.serviceName}
             onChange={handleChange} />

            <p className="error-services">
              {errors.serviceName}
            </p>
          </div>

          <div className="form-group-services">
            <label> Standard Service Recharge </label>

            <input type="text" name="standardRecharge"
              value={formData.standardRecharge}
              onChange={handleChange}/>

            <p className="error-services">
              { errors.standardRecharge}
            </p>   
           </div>    
            
          <div className="form-group-services">
            <label>Service Type </label>
            <div className="radio-group-services">

              <label>
                <input  type="radio"  name="serviceType" value="Machine"
                 checked={ formData.serviceType ==="Machine"}
                 onChange={handleChange}/>
                  Machine
              </label>    

              <label>
                <input type="radio" name="serviceType"value="Therapy"
                 checked={ formData.serviceType ===  "Therapy"}
                 onChange={handleChange}/>
                 Therapy  
              </label>   
            </div>       

            <p className="error-services"> {errors.serviceType}</p>
         </div>    
            
          <div className="form-group-services">
            <label> Advanced Service Recharge </label>
             
           

            <input  type="text"  name="advancedRecharge"
              value={formData.advancedRecharge}
             onChange={handleChange} />

            <p className="error-services">
              {errors.advancedRecharge}
             </p>    
          </div>

          <div className="form-group-services">
            <label>Prize Sub Category </label>
              
           

            <input type="text" name="priceSubCategory"
              value={   formData.priceSubCategory}
             onChange={handleChange}/>

            <p className="error-services">
              {errors.priceSubCategory}
             </p>     
          </div>    

          <div className="form-group-services">

  <label>Status</label>

  <div className="radio-group-services">

    <label>
      <input
        type="radio"
        name="status"
        value="Active"
        checked={
          formData.status ===
          "Active"
        }
        onChange={handleChange}
      />
      Active
    </label>

    <label>
      <input
        type="radio"
        name="status"
        value="Inactive"
        checked={
          formData.status ===
          "Inactive"
        }
        onChange={handleChange}
      />
      Inactive
    </label>

  </div>

  <p className="error-services">
    {errors.status}
  </p>

</div>
        
          <button   type="submit"  className="save-btn">
          {editId  ? "Update Service" : "Add Service"}
         </button>  
        
        </form>

      </div>

      {services.length > 0 && (

        <div className="table-wrapper-services">

          <table className="table-services">

            <thead>
              <tr>
                <th>S.No</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Service Name</th>
                <th>Type</th>
                <th>Standard</th>
                <th>Advanced</th>
                <th>Prize</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {services.map(
                (item, index) => (
                  <tr key={item.id}>

                    <td>{index + 1}</td>
                    <td>{item.category}</td>
                    <td> { item.subCategory}</td> 
                    <td>{item.serviceName}</td>
                    <td>{ item.serviceType}</td>
                    <td>  ₹{ item.standardRecharge} </td> 
                    <td> ₹{ item.advancedRecharge} </td> 
                    <td> ₹{item.priceSubCategory}</td>
<td>

  <span
    className={
      item.status === "Active"
        ? "status-active-services"
        : "status-inactive-services"
    }
  >
    {item.status}
  </span>

</td>


                    <td>

                      <button
                        className="edit-btn-services"
                        onClick={() =>
                          handleEdit(
                            item
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn-services"
                        onClick={() =>
                          handleDelete(
                            item.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      )}

    </div>
    </>
  );
}