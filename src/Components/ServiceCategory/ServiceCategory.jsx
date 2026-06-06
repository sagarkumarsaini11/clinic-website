import React, { useState } from "react";
import "./ServiceCategory.css";
import Sidebar from "../Sidebar/Sidebar";

export default function ServiceCategory() {

  const [categoryName, setCategoryName] = useState("");
  const [categoryFee, setCategoryFee] = useState("");
  const [status, setStatus]=useState("");
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

     if (!status) {
      newErrors.status = "Select Status";
     }

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
      status,
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
    setStatus("");
    setErrors({});
  };

  const handleEdit = (item) => {
    setCategoryName(
      item.categoryName
    );

    setCategoryFee(
      item.categoryFee
    );

    setStatus(item.status);

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

  return (<>
  <Sidebar/>
    <div className="service-page-category">

      <div className="service-card-category">

        <h2> Service Category </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group-category">

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

          <div className="form-group-category">

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
              <p className="error-category"> { errors.categoryFee }</p>)}
            </div>   

            <div className="form-group-category">

  <label>Status</label>

  <div className="radio-group-category">

    <label>
      <input
        type="radio"
        name="status"
        value="Active"
        checked={
          status === "Active"
        }
        onChange={(e) =>
          setStatus(
            e.target.value
          )
        }
      />
      Active
    </label>

    <label>
      <input
        type="radio"
        name="status"
        value="Inactive"
        checked={
          status === "Inactive"
        }
        onChange={(e) =>
          setStatus(
            e.target.value
          )
        }
      />
      Inactive
    </label>

  </div>

  {errors.status && (
    <p className="error-category">
      {errors.status}
    </p>
  )}

</div>

          <button  type="submit"  className="add-btn-category">
           {editId ? "Update Category" : "Add Category"}
        
          </button>    
        </form>
      </div>

      {categories.length >
        0 && (
        <div className="table-card-category">

          <h3>  Added Categories</h3>
          <div className="table-wrapper-category">

            <table>

              <thead>
                <tr>
                  <th> S.No </th>
                  <th>Category Name</th>
                  <th> Category Fee </th>
                  <th>Status</th>
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
  <span
    className={
      item.status === "Active"
        ? "status-active-category"
        : "status-inactive-category"
    }
  >
    {item.status}
  </span>
</td>

<td className="action-cell-category">
  <button
    className="edit-btn-category"
    onClick={() => handleEdit(item)}
  >
    Edit
  </button>

  <button
    className="delete-btn-category"
    onClick={() => handleDelete(item.id)}
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

        </div>
      )}

    </div>
    </>
  );
}