import React, { useState } from "react";
import "./AddDoctorList.css";

export default function AddDoctorList() {
  const [doctorList, setDoctorList] = useState([
    {
      id: 1,
      doctorName: "Dr. Amit Sharma",
      mobile: "9876543210",
      hospitalName: "City Care Hospital",
      address: "Delhi Road, Saharanpur",
    },
    {
      id: 2,
      doctorName: "Dr. Neha Verma",
      mobile: "9876501234",
      hospitalName: "Life Care Hospital",
      address: "Court Road, Saharanpur",
    },
    {
      id: 3,
      doctorName: "Dr. Rahul Gupta",
      mobile: "9812345678",
      hospitalName: "Krishna Hospital",
      address: "Hakikat Nagar, Saharanpur",
    },
    {
      id: 4,
      doctorName: "Dr. Priya Singh",
      mobile: "9765432109",
      hospitalName: "Health Plus Hospital",
      address: "Ambala Road, Saharanpur",
    },
    {
      id: 5,
      doctorName: "Dr. Mohit Kumar",
      mobile: "9654321098",
      hospitalName: "Advance Care Hospital",
      address: "Delhi Road, Saharanpur",
    },
  ]);

  const [editDoctorId, setEditDoctorId] = useState(null);

  const [editDoctorData, setEditDoctorData] = useState({
    doctorName: "",
    mobile: "",
    hospitalName: "",
    address: "",
  });

  // ================= DELETE DOCTOR =================

  const handleDelete = (id) => {
    const updatedDoctorList = doctorList.filter(
      (doctor) => doctor.id !== id
    );

    setDoctorList(updatedDoctorList);

    if (editDoctorId === id) {
      setEditDoctorId(null);
    }
  };

  // ================= EDIT DOCTOR =================

  const handleEdit = (doctor) => {
    setEditDoctorId(doctor.id);

    setEditDoctorData({
      doctorName: doctor.doctorName,
      mobile: doctor.mobile,
      hospitalName: doctor.hospitalName,
      address: doctor.address,
    });
  };

  // ================= INPUT CHANGE =================

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditDoctorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ================= SAVE DOCTOR =================

  const handleSave = (id) => {
    const updatedDoctorList = doctorList.map((doctor) =>
      doctor.id === id
        ? {
            ...doctor,
            ...editDoctorData,
          }
        : doctor
    );

    setDoctorList(updatedDoctorList);

    setEditDoctorId(null);

    setEditDoctorData({
      doctorName: "",
      mobile: "",
      hospitalName: "",
      address: "",
    });
  };

  // ================= CANCEL EDIT =================

  const handleCancel = () => {
    setEditDoctorId(null);

    setEditDoctorData({
      doctorName: "",
      mobile: "",
      hospitalName: "",
      address: "",
    });
  };

  return (
    <div className="container-doctor-list">
      <div className="content-doctor-list">
        <div className="header-doctor-list">
          <h2 className="heading-doctor-list">Doctor List</h2>
        </div>

        <div className="table-wrapper-doctor-list">
          <table className="table-doctor-list">
            <thead className="thead-doctor-list">
              <tr className="header-row-doctor-list">
                <th className="th-doctor-list">S.No</th>

                <th className="th-doctor-list">
                  Doctor Name
                </th>

                <th className="th-doctor-list">
                  Mobile
                </th>

                <th className="th-doctor-list">
                  Hospital Name
                </th>

                <th className="th-doctor-list">
                  Address
                </th>

                <th className="th-doctor-list">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="tbody-doctor-list">
              {doctorList.length > 0 ? (
                doctorList.map((doctor, index) => (
                  <tr
                    className="row-doctor-list"
                    key={doctor.id}
                  >
                    {/* SERIAL NUMBER */}

                    <td className="td-doctor-list">
                      {index + 1}
                    </td>

                    {/* DOCTOR NAME */}

                    <td className="td-doctor-list">
                      {editDoctorId === doctor.id ? (
                        <input
                          type="text"
                          name="doctorName"
                          value={editDoctorData.doctorName}
                          onChange={handleEditChange}
                          className="edit-input-doctor-list"
                        />
                      ) : (
                        doctor.doctorName
                      )}
                    </td>

                    {/* MOBILE */}

                    <td className="td-doctor-list">
                      {editDoctorId === doctor.id ? (
                        <input
                          type="text"
                          name="mobile"
                          value={editDoctorData.mobile}
                          onChange={handleEditChange}
                          className="edit-input-doctor-list"
                          maxLength="10"
                        />
                      ) : (
                        doctor.mobile
                      )}
                    </td>

                    {/* HOSPITAL NAME */}

                    <td className="td-doctor-list">
                      {editDoctorId === doctor.id ? (
                        <input
                          type="text"
                          name="hospitalName"
                          value={
                            editDoctorData.hospitalName
                          }
                          onChange={handleEditChange}
                          className="edit-input-doctor-list"
                        />
                      ) : (
                        doctor.hospitalName
                      )}
                    </td>

                    {/* ADDRESS */}

                    <td className="td-doctor-list">
                      {editDoctorId === doctor.id ? (
                        <input
                          type="text"
                          name="address"
                          value={editDoctorData.address}
                          onChange={handleEditChange}
                          className="edit-input-doctor-list"
                        />
                      ) : (
                        doctor.address
                      )}
                    </td>

                    {/* ACTION */}

                    <td className="td-doctor-list">
                      <div className="action-buttons-doctor-list">
                        {editDoctorId === doctor.id ? (
                          <>
                            <button
                              className="save-button-doctor-list"
                              onClick={() =>
                                handleSave(doctor.id)
                              }
                            >
                              Save
                            </button>

                            <button
                              className="cancel-button-doctor-list"
                              onClick={handleCancel}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="edit-button-doctor-list"
                              onClick={() =>
                                handleEdit(doctor)
                              }
                            >
                              Edit
                            </button>

                            <button
                              className="delete-button-doctor-list"
                              onClick={() =>
                                handleDelete(doctor.id)
                              }
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="empty-row-doctor-list">
                  <td
                    className="empty-data-doctor-list"
                    colSpan="6"
                  >
                    No Doctor Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}