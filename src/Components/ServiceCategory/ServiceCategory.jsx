import React, { useState } from "react";
import "./ServiceCategory.css";

export default function ServiceCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryFee, setCategoryFee] = useState("");

  const [categories, setCategories] = useState([]);

  const [editId, setEditId] = useState(null);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!categoryName.trim()) {
      newErrors.categoryName =
        "Category Name is required";
    }

    if (categoryName.length > 100) {
      newErrors.categoryName =
        "Maximum 100 characters allowed";
    }

    if (!categoryFee) {
 newErrors.categoryFee =
  "Category Fee is required";
} else if ( !/^\d+(\.\d{1,2})?$/.test(categoryFee)) 
{newErrors.categoryFee ="Only 2 decimal places allowed";}

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const categoryData = {
      id:
        editId ||
        Date.now(),
      categoryName,
      categoryFee,
    };

    if (editId) {
      const updatedData =
        categories.map((item) =>
          item.id === editId
            ? categoryData
            : item
        );

      setCategories(updatedData);

      console.log(
        "Updated Category:",
        categoryData
      );

      setEditId(null);
    } else {
      setCategories([
        ...categories,
        categoryData,
      ]);

      console.log(
        "New Category:",
        categoryData
      );
    }

    setCategoryName("");
    setCategoryFee("");
    setErrors({});
  };

  const handleEdit = (item) => {
    setCategoryName(
      item.categoryName
    );

    setCategoryFee(
      item.categoryFee
    );

    setEditId(item.id);
  };

  const handleDelete = (id) => {
    const filteredData =
      categories.filter(
        (item) =>
          item.id !== id
      );

    setCategories(filteredData);

    console.log(
      "Deleted Category ID:",
      id
    );
  };

  return (
    <div className="service-page">

      <div className="service-card">

        <h2> Service Category </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group-services">

            <label>  Category Name </label>
            
     <input  type="text" maxLength="100" placeholder="Enter Category Name"
     value={ categoryName}  onChange={(e) => setCategoryName( e.target.value)} />
             
         {errors.categoryName && (
              <p className="error">
                {
                  errors.categoryName
                }
              </p>
            )}

          </div>      

          <div className="form-group-services">

            <label> Category Fee </label>

            <input
  type="number"
  step="0.01"
  min="0"
  placeholder="Enter Fee"
  value={categoryFee}
  onChange={(e) => {

    const value = e.target.value;

    if (
      value === "" ||
      /^\d+(\.\d{0,2})?$/.test(value)
    ) {
      setCategoryFee(value);
    }

  }}
/>
             
            {errors.categoryFee && (
              <p className="error-services"> { errors.categoryFee }</p>)}
            </div>   

          <button  type="submit"  className="add-btn-services">
           {editId ? "Update Category" : "Add Category"}
        
          </button>    
        </form>
      </div>

      {categories.length >
        0 && (
        <div className="table-card-services">

          <h3>  Added Categories</h3>
          <div className="table-wrapper-services">

            <table>

              <thead>
                <tr>
                  <th> S.No </th>
                  <th>Category Name</th>
                  <th> Category Fee </th>
                  <th> Action </th>
                </tr>
              </thead>

              <tbody>

                {categories.map(
                  (
                    item,
                    index
                  ) => (
                       <tr  key={ item.id}>
                      <td>  {index +1}  </td>
                      <td> { item.categoryName}</td>  
                      <td>₹{ item.categoryFee }</td>

                      <td>
                        <button  className="edit-btn-services"
                         onClick={() => handleEdit( item ) } >
                           Edit
                         </button>  

                        <button    className="delete-btn-services"
                         onClick={() => handleDelete( item.id )} >
                        Delete
                         </button>   

                      </td>
                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>
      )}

    </div>
  );
}