import React,
{
  useState,
  useEffect,
} from "react";
import "./PreviouslyAddedClinics.css";
import { useNavigate } from "react-router-dom";

export default function PreviouslyAddedClinics() {

  const navigate = useNavigate();

  const [clinics, setClinics] = useState([]);

  const [editingClinic, setEditingClinic] =
  useState(null);

const [editData, setEditData] =
  useState({});

  useEffect(() => {

  const savedClinics =
    JSON.parse(
      localStorage.getItem("clinics")
    ) || [];

  setClinics(savedClinics);

}, []);

  const [previewVisible, setPreviewVisible] =
    useState(false);

  const [selectedImage, setSelectedImage] =
    useState("");

  // Open Image

  const openImage = (image) => {

    setSelectedImage(image);
    setPreviewVisible(true);
  };

  // EDIT DATA
  const handleEdit = (clinic) => {

  setEditingClinic(clinic.id);

  setEditData({
    ...clinic,
  });
};

//Edit data save
const handleSave = () => {

  const updatedClinics =
    clinics.map((clinic) =>
      clinic.id === editingClinic
        ? editData
        : clinic
    );

  setClinics(updatedClinics);

  localStorage.setItem(
    "clinics",
    JSON.stringify(updatedClinics)
  );

  setEditingClinic(null);

  alert("Clinic Updated Successfully");
};

  // Delete Clinic

const handleDelete = (id) => {

  const confirmDelete =
    window.confirm(
      "Are you sure you want to delete this clinic?"
    );

  if (!confirmDelete) return;

  const updatedClinics =
    clinics.filter(
      (clinic) => clinic.id !== id
    );

  setClinics(updatedClinics);

  localStorage.setItem(
    "clinics",
    JSON.stringify(updatedClinics)
  );

  alert(
    "Clinic deleted successfully."
  );
};

  return (

    <div className="container-clinic">

      {/* Header */}

      <div className="header-clinic">

        <h1 className="heading-clinic">
          ADDED CLINICS
        </h1>

        <button
          className="top-add-btn-clinic"
          onClick={() =>
            navigate("/add-clinic")
          }
        >
          + Add
        </button>

      </div>

      {/* Clinic List */}

{clinics.length === 0 ? (

  <p className="empty-text-clinic">
    No Clinics Added
  </p>

) : (

  <div className="table-container-clinic">

    <table className="clinic-table">

      <thead>
        <tr>
          <th>S.No</th>
          <th>Clinic Name</th>
          <th>Doctor</th>
          <th>Contact</th>
          <th>Email</th>
          <th>Registration</th>
          <th>GSTIN</th>
          <th>Images</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>

        {clinics.map((item, index) => (

          <tr key={item.id}>

            <td>{index + 1}</td>

          <td>

{editingClinic === item.id ? (

  <input
    value={editData.clinicName}
    onChange={(e) =>
      setEditData({
        ...editData,
        clinicName: e.target.value,
      })
    }
  />

) : (

  item.clinicName

)}

</td>

         <td>

{editingClinic === item.id ? (

  <input
    value={editData.doctorName}
    onChange={(e) =>
      setEditData({
        ...editData,
        doctorName: e.target.value,
      })
    }
  />

) : (

  item.doctorName

)}

</td>

            <td>

{editingClinic === item.id ? (

  <input
    value={editData.contactNo}
    onChange={(e) =>
      setEditData({
        ...editData,
        contactNo: e.target.value,
      })
    }
  />

) : (

  item.contactNo

)}

</td>

            <td>

{editingClinic === item.id ? (

  <input
    value={editData.email}
    onChange={(e) =>
      setEditData({
        ...editData,
        email: e.target.value,
      })
    }
  />

) : (

  item.email

)}

</td>

           <td>

{editingClinic === item.id ? (

  <input
    value={editData.registrationNo}
    onChange={(e) =>
      setEditData({
        ...editData,
        registrationNo: e.target.value,
      })
    }
  />

) : (

  item.registrationNo

)}

</td>

           <td>

{editingClinic === item.id ? (

  <input
    value={editData.gstin}
    onChange={(e) =>
      setEditData({
        ...editData,
        gstin: e.target.value,
      })
    }
  />

) : (

  item.gstin

)}

</td>

            <td>

              <div className="table-images">

                {[
                  item.logoFile,
                  item.headerFile,
                  item.footerFile,
                  item.idCardFile,
                ].map(
                  (image, i) =>

                    image && (

                      <img
                        key={i}
                        src={image}
                        alt=""
                        className="small-image"
                        onClick={() =>
                          openImage(image)
                        }
                      />
                    )
                )}

              </div>

            </td>

            <td>
<td>

{editingClinic === item.id ? (

  <button
    className="save-btn-clinic"
    onClick={handleSave}
  >
    Save
  </button>

) : (

  <button
    className="edit-btn-clinic"
    onClick={() =>
      handleEdit(item)
    }
  >
    Edit
  </button>

)}

<button
  className="delete-btn-clinic"
  onClick={() =>
    handleDelete(item.id)
  }
>
  Delete
</button>

</td>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

)}

      {/* Image Modal */}
{previewVisible && (

  <div
    className="image-modal-clinic"
    onClick={() =>
      setPreviewVisible(false)
    }
  >

    <div
      onClick={(e) =>
        e.stopPropagation()
      }
    >

      <img
        src={selectedImage}
        alt=""
        className="full-image-clinic"
      />

    </div>

  </div>

)}

    </div>
  );
}