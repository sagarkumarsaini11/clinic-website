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

  const handleDelete = (id) => {
    const updatedDoctorList = doctorList.filter(
      (doctor) => doctor.id !== id
    );

    setDoctorList(updatedDoctorList);
  };

  return (
    <div className="container-doctor-list">
      <div className="content-doctor-list">
        <div className="header-doctor-list">
          <h2 className="heading-doctor-list">Add Doctor List</h2>
        </div>

        <div className="table-wrapper-doctor-list">
          <table className="table-doctor-list">
            <thead className="thead-doctor-list">
              <tr className="header-row-doctor-list">
                <th className="th-doctor-list">S.No</th>
                <th className="th-doctor-list">Doctor Name</th>
                <th className="th-doctor-list">Mobile</th>
                <th className="th-doctor-list">Hospital Name</th>
                <th className="th-doctor-list">Address</th>
                <th className="th-doctor-list">Action</th>
              </tr>
            </thead>

            <tbody className="tbody-doctor-list">
              {doctorList.length > 0 ? (
                doctorList.map((doctor, index) => (
                  <tr className="row-doctor-list" key={doctor.id}>
                    <td className="td-doctor-list">{index + 1}</td>

                    <td className="td-doctor-list">
                      {doctor.doctorName}
                    </td>

                    <td className="td-doctor-list">{doctor.mobile}</td>

                    <td className="td-doctor-list">
                      {doctor.hospitalName}
                    </td>

                    <td className="td-doctor-list">{doctor.address}</td>

                    <td className="td-doctor-list">
                      <button
                        className="delete-button-doctor-list"
                        onClick={() => handleDelete(doctor.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="empty-row-doctor-list">
                  <td className="empty-data-doctor-list" colSpan="6">
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