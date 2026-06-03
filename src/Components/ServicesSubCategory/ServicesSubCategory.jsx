import React, { useState } from "react";
import "./ServicesSubCategory.css";

export default function ServicesSubCategory() {

  const [formData, setFormData] = useState({
    category: "",
    subCategoryName: "",
    subCategoryFee: "",
  });

  const [errors, setErrors] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {

    const { name, value } = e.target;

    if (name === "subCategoryFee") {

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

    if (!formData.category) {
      newErrors.category =
        "Category is required";
    }

    if (!formData.subCategoryName.trim()) {
      newErrors.subCategoryName =
        "Sub Category Name is required";
    }

    if (
      formData.subCategoryName.length > 100
    ) {
      newErrors.subCategoryName =
        "Maximum 100 characters allowed";
    }

    if (!formData.subCategoryFee) {
      newErrors.subCategoryFee =
        "Fee is required";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    const newData = {
      id: editId || Date.now(),
      ...formData,
    };

    if (editId) {

      const updatedData =
        subCategories.map((item) =>
          item.id === editId
            ? newData
            : item
        );

      setSubCategories(updatedData);

      console.log(
        "Updated Sub Category:",
        newData
      );

      setEditId(null);

    } else {

      setSubCategories([
        ...subCategories,
        newData,
      ]);

      console.log(
        "Added Sub Category:",
        newData
      );
    }

    setFormData({
      category: "",
      subCategoryName: "",
      subCategoryFee: "",
    });

    setErrors({});
  };

  const handleEdit = (item) => {

    setFormData({
      category: item.category,
      subCategoryName:
        item.subCategoryName,
      subCategoryFee:
        item.subCategoryFee,
    });

    setEditId(item.id);
  };

  const handleDelete = (id) => {

    const filteredData =
      subCategories.filter(
        (item) => item.id !== id
      );

    setSubCategories(filteredData);
  };

  return (
    <div className="sub-page">

      <div className="sub-form-card">

        <h2>
          Services Sub Category
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group-sub-category">

            <label>
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">
                Select Category
              </option>

              <option value="Category A">
                Category A
              </option>

              <option value="Category B">
                Category B
              </option>

              <option value="Category C">
                Category C
              </option>

            </select>

            {errors.category && (
              <p className="error-text-sub-category">
                {errors.category}
              </p>
            )}

          </div>

          <div className="form-group-sub-category">

            <label>
              Sub Category Name
            </label>

            <input
              type="text"
              name="subCategoryName"
              maxLength="100"
              placeholder="Enter Sub Category Name"
              value={
                formData.subCategoryName
              }
              onChange={handleChange}
            />

            {errors.subCategoryName && (
              <p className="error-text-sub-category">
                {
                  errors.subCategoryName
                }
              </p>
            )}

          </div>

          <div className="form-group-sub-category">

            <label>
              Sub Category Fee
            </label>

            <input
              type="text"
              name="subCategoryFee"
              placeholder="Enter Fee"
              value={
                formData.subCategoryFee
              }
              onChange={handleChange}
            />

            {errors.subCategoryFee && (
              <p className="error-text-sub-category">
                {
                  errors.subCategoryFee
                }
              </p>
            )}

          </div>

          <button
            type="submit"
            className="save-btn-sub-category"
          >
            {editId
              ? "Update Sub Category"
              : "Add Sub Category"}
          </button>

        </form>

      </div>

      {subCategories.length > 0 && (

        <div className="table-card-sub-category">

          <h3>
            Added Sub Categories
          </h3>

          <div className="table-wrapper-sub-category">

            <table className="table-sub-category">

              <thead>

                <tr>
                  <th>S.No</th>
                  <th>Category</th>
                  <th>Sub Category</th>
                  <th>Fee</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {subCategories.map(
                  (item, index) => (

                    <tr key={item.id}>

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        {item.category}
                      </td>

                      <td>
                        {
                          item.subCategoryName
                        }
                      </td>

                      <td>
                        ₹
                        {
                          item.subCategoryFee
                        }
                      </td>

                      <td>

                        <button
                          className="edit-btn-sub-category"
                          onClick={() =>
                            handleEdit(item)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn-sub-category"
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

        </div>

      )}

    </div>
  );
}