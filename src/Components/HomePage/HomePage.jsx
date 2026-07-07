import React, {
  useEffect,
  useState,
} from "react";

import "./HomePage.css";

import Cookies from "js-cookie";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaCamera,
  FaTimes,
  FaWallet,
  FaFolder,
  FaHome,
  FaWhatsapp,
  FaFilePrescription,
  FaClipboardList,
  FaCalendarCheck,
  FaSearch,
} from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // STATES

  const [ showAppointments, setShowAppointments,] = useState(false);
  const [ currentPatient, setCurrentPatient,] = useState(null);
  const [ searchValue, setSearchValue,] = useState("");
  const [showPatientCard,setShowPatientCard, ] = useState(false);
  const [ attendanceMarked, setAttendanceMarked,] = useState(false);
  const [ attendanceDate,setAttendanceDate, ] = useState("Not Marked");
  const [loading,setLoading,] = useState(true);
  const [ patientList, setPatientList,] = useState([]);
  const [showProfileModal, setShowProfileModal,] = useState(false);
    
   
  

  const [
    userData,
    setUserData,
  ] = useState(null);

  // PROFILE DATA

  useEffect(() => {
    const userCookie =
      Cookies.get("user");

    const localUser =
      localStorage.getItem("user");

    try {
      if (userCookie) {
        const user =
          JSON.parse(userCookie);

        console.log(
          "Logged User From Cookie:",
          user
        );

        setUserData(user);
      } else if (localUser) {
        const user =
          JSON.parse(localUser);

        console.log(
          "Logged User From LocalStorage:",
          user
        );

        setUserData(user);
      }
    } catch (error) {
      console.error(
        "User Parse Error:",
        error
      );
    }
  }, []);

  // GET ALL PATIENTS API

  const fetchPatients = async () => {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      console.log(
        "Patient GET Token:",
        token
      );

      if (!token) {
        alert(
          "Token not found. Please login again."
        );

        navigate("/login");

        return;
      }

      const response = await fetch(
        "https://clinic-backend-5ucx.onrender.com/api/clinic/patients",
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      console.log(
        "GET STATUS:",
        response.status
      );

      console.log(
        "COMPLETE GET RESPONSE:",
        data
      );

      // ========================================
      // 401 ERROR
      // ========================================

      if (response.status === 401) {
        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        alert(
          "Session expired. Please login again."
        );

        navigate("/login");

        return;
      }

      // ========================================
      // 403 ERROR
      // ========================================

      if (response.status === 403) {
        alert(
          data.message ||
            "You do not have permission to view patients."
        );

        return;
      }

      // ========================================
      // API ERROR
      // ========================================

      if (!response.ok) {
        alert(
          data.message ||
            data.error ||
            "Failed to get patients"
        );

        return;
      }

      // ========================================
      // GET PATIENT ARRAY
      // ========================================

      let patients = [];

      if (Array.isArray(data)) {
        patients = data;
      } else if (
        Array.isArray(data.data)
      ) {
        patients = data.data;
      } else if (
        Array.isArray(data.patients)
      ) {
        patients = data.patients;
      } else if (
        Array.isArray(
          data.data?.patients
        )
      ) {
        patients =
          data.data.patients;
      } else if (
        Array.isArray(data.result)
      ) {
        patients = data.result;
      }

      console.log(
        "PATIENT ARRAY:",
        patients
      );

      // ========================================
      // FORMAT PATIENT DATA
      // ========================================

      const formattedPatients =
        patients.map((item) => {
          // PAYABLE AMOUNT
          // Add Patient Form default amount = 700

          const payableAmount = Number(
            item.amount ??
              item.payable_amount ??
              item.package_amount ??
              700
          );

          // CASH PAID

          const cashPaid = Number(
            item.cash_amount ??
              item.cash ??
              0
          );

          // UPI PAID

          const upiPaid = Number(
            item.upi_amount ??
              item.online_amount ??
              item.upi ??
              0
          );

          // ACTUAL TOTAL PAID

          const totalPaid =
            cashPaid + upiPaid;

          return {
            ...item,

            // ID

            _id:
              item.id ||
              item._id ||
              "",

            // NAME

            name:
              item.full_name ||
              item.name ||
              "",

            // AGE

            age:
              item.age ?? "",

            // GENDER

            gender:
              item.gender ||
              item.sex ||
              "",

            // MOBILE

            mobileNumber:
              item.mobile_number ||
              item.mobileNumber ||
              item.mobile ||
              "",

            // ADDRESS

            address:
              item.address ||
              "",

            // PROBLEM

            problem:
              item.disease_problem ||
              item.problem ||
              "",

            // APPOINTMENT TYPE

            appointmentType:
              item.appointment_type ||
              item.appointmentType ||
              "",

            // APPOINTMENT DATE

            appointmentDate:
              item.appointment_date ||
              item.appointmentDate ||
              item.created_date ||
              "",

            // APPOINTMENT TIME

            appointmentTime:
              item.appointment_time ||
              item.appointmentTime ||
              "",

            // PAYABLE AMOUNT

            amount: payableAmount,

            // CASH PAID

            cash: cashPaid,

            // UPI PAID

            upi: upiPaid,

            // TOTAL PAID

            total: totalPaid,

            // BACKEND TOTAL AMOUNT

            backendTotalAmount: Number(
              item.total_amount ?? 0
            ),

            // FILE NUMBER

            fileNo:
              item.file_number ||
              item.fileNo ||
              "",

            // PATIENT CODE

            patientCode:
              item.patient_code ||
              item.patientCode ||
              "",

            // LAST ATTENDANCE

            lastAttendanceDate:
              item.last_attendance_date ||
              "",

            // PAYMENT METHOD

            paymentMethod:
              item.payment_method ||
              "",

            // PACKAGE NAME

            packageName:
              item.package_name ||
              "",

            // SESSIONS REMAINING

            sessionsRemaining:
              item.sessions_remaining ??
              0,

            // REPORT TYPE

            reportType:
              item.report_type ||
              "",

            // START DATE

            startDate:
              item.start_date ||
              "",

            // CREATED DATE

            createdDate:
              item.created_date ||
              "",

            // BRANCH ID

            branchId:
              item.branch_id ||
              "",

            // DOCUMENT

            documentFile:
              item.document_file ||
              null,
          };
        });

      console.log(
        "FORMATTED PATIENT DATA:",
        formattedPatients
      );

      setPatientList(
        formattedPatients
      );
    } catch (error) {
      console.error(
        "Fetch Patient Error:",
        error
      );

      alert(
        "Something went wrong while loading patients!"
      );
    } finally {
      setLoading(false);
    }
  };

  // CALL GET API

  useEffect(() => {
    fetchPatients();
  }, []);

  // OPEN PATIENT POPUP FROM LOCATION

  useEffect(() => {
    if (
      location.state?.openPatientPopup &&
      location.state?.patient
    ) {
      setCurrentPatient(
        location.state.patient
      );

      setShowPatientCard(true);
    }
  }, [location]);

  // OPEN PATIENT

  const openPatient = (patient) => {
    setCurrentPatient(patient);

    setAttendanceMarked(false);

    setAttendanceDate(
      patient.lastAttendanceDate
        ? new Date(
            patient.lastAttendanceDate
          ).toLocaleDateString(
            "en-IN"
          )
        : "Not Marked"
    );

    setShowPatientCard(true);
  };

  // SEARCH PATIENT

  const handleSubmit = () => {
    const search =
      searchValue
        .trim()
        .toLowerCase();

    if (!search) {
      return;
    }

    const patient =
      patientList.find((item) => {
        const name =
          String(
            item.name || ""
          ).toLowerCase();

        const mobile =
          String(
            item.mobileNumber || ""
          );

        const fileNo =
          String(
            item.fileNo || ""
          ).toLowerCase();

        const patientCode =
          String(
            item.patientCode || ""
          ).toLowerCase();

        return (
          name.includes(search) ||
          mobile ===
            searchValue.trim() ||
          fileNo === search ||
          patientCode === search
        );
      });

    if (!patient) {
      alert("Patient Not Found");

      return;
    }

    openPatient(patient);
  };

  // CAMERA CLICK

  const handleCameraClick = () => {
    alert(
      "Camera Scanner Opened Successfully"
    );
  };

  // ENTER KEY

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      handleSubmit();
    }
  };

  // MARK ATTENDANCE

  const handleMarkAttendance = () => {
    const today =
      new Date().toLocaleDateString(
        "en-IN"
      );

    setAttendanceMarked(true);

    setAttendanceDate(today);

    alert(
      `${currentPatient?.name} Attendance Marked`
    );
  };

  // PAYMENT STATUS

  const getPaymentStatus = (
    cash,
    upi,
    amount
  ) => {
    const cashPaid =
      Number(cash || 0);

    const upiPaid =
      Number(upi || 0);

    const payableAmount =
      Number(amount || 0);

    const totalPaid =
      cashPaid + upiPaid;

    // UNPAID

    if (totalPaid === 0) {
      return "Unpaid";
    }

    // PARTIAL PAYMENT

    if (
      payableAmount > 0 &&
      totalPaid < payableAmount
    ) {
      return "Partial";
    }

    // FULL PAYMENT

    if (
      payableAmount > 0 &&
      totalPaid >= payableAmount
    ) {
      return "Paid";
    }

    return "Unpaid";
  };

  // RETURN

  return (
    <div className="container-homepage">

      {/* SEARCH BOX */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Enter File No / Patient Name / Mobile No"
          value={searchValue}
          onChange={(e) =>
            setSearchValue(
              e.target.value
            )
          }
          onKeyDown={handleEnterKey}
        />

        {searchValue.trim().length >
        0 ? (
          <button
            className="search-icon-btn"
            onClick={handleSubmit}
          >
            <FaSearch size={20} />
          </button>
        ) : (
          <button
            className="search-icon-btn"
            onClick={
              handleCameraClick
            }
          >
            <FaCamera size={20} />
          </button>
        )}

      </div>

      {/* ======================================
          PATIENT RECORDS
      ====================================== */}

      {loading ? (
        <h3 className="loading-text">
          Loading Patient Records...
        </h3>
      ) : (
        <div className="records-section">

          <button
            className="appointment-record-btn"
            onClick={() =>
              setShowAppointments(
                !showAppointments
              )
            }
          >
            {showAppointments
              ? "Hide Patient Records"
              : "Show Patient Records"}
          </button>

          {showAppointments && (
            <>
              {patientList.length ===
              0 ? (
                <p>
                  No Patient Added
                </p>
              ) : (
                <div className="table-container">

                  <table className="appointment-table">

                    <thead>
                      <tr>
                        <th>S.No</th>

                        <th>Name</th>

                        <th>Age</th>

                        <th>Gender</th>

                        <th>Mobile</th>

                        <th>Address</th>

                        <th>Problem</th>

                        <th>
                          Appointment Type
                        </th>

                        <th>
                          Appointment Date
                        </th>

                        <th>
                          Appointment Time
                        </th>

                        <th>Amount</th>

                        <th>
                          Cash Paid
                        </th>

                        <th>
                          UPI / Online
                        </th>

                        <th>
                          Total Paid
                        </th>

                        <th>
                          Payment Status
                        </th>

                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>

                      {patientList.map(
                        (
                          item,
                          index
                        ) => {
                          const amount =
                            Number(
                              item.amount ||
                                0
                            );

                          const cashPaid =
                            Number(
                              item.cash ||
                                0
                            );

                          const upiPaid =
                            Number(
                              item.upi ||
                                0
                            );

                          const totalPaid =
                            cashPaid +
                            upiPaid;

                          const paymentStatus =
                            getPaymentStatus(
                              cashPaid,
                              upiPaid,
                              amount
                            );

                          return (
                            <tr
                              key={
                                item._id ||
                                index
                              }
                            >

                              <td>
                                {index + 1}
                              </td>

                              <td>
                                {item.name ||
                                  "-"}
                              </td>

                              <td>
                                {item.age ??
                                  "-"}
                              </td>

                              <td>
                                {item.gender ||
                                  "-"}
                              </td>

                              <td>
                                {item.mobileNumber ||
                                  "-"}
                              </td>

                              <td>
                                {item.address ||
                                  "-"}
                              </td>

                              <td>
                                {item.problem ||
                                  "-"}
                              </td>

                              <td>
                                {item.appointmentType ||
                                  "-"}
                              </td>

                              <td>
                                {item.appointmentDate
                                  ? new Date(
                                      item.appointmentDate
                                    ).toLocaleDateString(
                                      "en-IN"
                                    )
                                  : "-"}
                              </td>

                              <td>
                                {item.appointmentTime ||
                                  "-"}
                              </td>

                              {/* AMOUNT */}

                              <td>
                                ₹{amount}
                              </td>

                              {/* CASH */}

                              <td>
                                ₹{cashPaid}
                              </td>

                              {/* UPI */}

                              <td>
                                ₹{upiPaid}
                              </td>

                              {/* TOTAL PAID */}

                              <td>
                                ₹{totalPaid}
                              </td>

                              {/* PAYMENT STATUS */}

                              <td>

                                <span
                                  className={`payment-status ${
                                    paymentStatus ===
                                    "Paid"
                                      ? "paid-status"
                                      : paymentStatus ===
                                        "Partial"
                                      ? "partial-status"
                                      : "unpaid-status"
                                  }`}
                                >
                                  {
                                    paymentStatus
                                  }
                                </span>

                              </td>

                              {/* ACTION */}

                              <td>

                                <button
                                  className="enter-btn"
                                  onClick={() =>
                                    openPatient(
                                      item
                                    )
                                  }
                                >
                                  Enter
                                </button>

                              </td>

                            </tr>
                          );
                        }
                      )}

                    </tbody>

                  </table>

                </div>
              )}
            </>
          )}

        </div>
      )}

      {/* ======================================
          PATIENT MODAL
      ====================================== */}

      {showPatientCard &&
        currentPatient && (
          <div className="modal-overlay">

            <div className="patient-card">

              <FaTimes
                className="close-icon"
                onClick={() =>
                  setShowPatientCard(
                    false
                  )
                }
              />

              <div className="patient-header">

                <h2>
                  {currentPatient.name ||
                    "Patient"}

                  {" ("}

                  {currentPatient.age ??
                    "-"}

                  {" / "}

                  {currentPatient.gender ||
                    "-"}

                  {")"}
                </h2>

                <p>
                  <strong>
                    Patient Code:
                  </strong>{" "}

                  {currentPatient.patientCode ||
                    "-"}
                </p>

                <p>
                  <strong>
                    Mobile:
                  </strong>{" "}

                  {currentPatient.mobileNumber ||
                    "-"}
                </p>

                <p>
                  <strong>
                    Address:
                  </strong>{" "}

                  {currentPatient.address ||
                    "-"}
                </p>

                <p>
                  <strong>
                    Problem:
                  </strong>{" "}

                  {currentPatient.problem ||
                    "-"}
                </p>

                <p>
                  <strong>
                    Appointment Type:
                  </strong>{" "}

                  {currentPatient.appointmentType ||
                    "-"}
                </p>

                <p>
                  <strong>
                    Appointment Date:
                  </strong>{" "}

                  {currentPatient.appointmentDate
                    ? new Date(
                        currentPatient.appointmentDate
                      ).toLocaleDateString(
                        "en-IN"
                      )
                    : "-"}
                </p>

                <p>
                  <strong>
                    Appointment Time:
                  </strong>{" "}

                  {currentPatient.appointmentTime ||
                    "-"}
                </p>

                <p>
                  <strong>
                    Last Attendance Date:
                  </strong>{" "}

                  {attendanceDate}
                </p>

                <p>
                  <strong>
                    File Number:
                  </strong>{" "}

                  {currentPatient.fileNo ||
                    "-"}
                </p>

                {/* PAYMENT DETAILS */}

                <div className="balance-box">

                  <p>
                    Amount: ₹
                    {Number(
                      currentPatient.amount ||
                        0
                    )}
                  </p>

                  <p>
                    Cash Paid: ₹
                    {Number(
                      currentPatient.cash ||
                        0
                    )}
                  </p>

                  <p>
                    UPI Paid: ₹
                    {Number(
                      currentPatient.upi ||
                        0
                    )}
                  </p>

                  <p>
                    Total Paid: ₹
                    {Number(
                      currentPatient.cash ||
                        0
                    ) +
                      Number(
                        currentPatient.upi ||
                          0
                      )}
                  </p>

                  <p>
                    Payment Status:{" "}

                    <strong>
                      {getPaymentStatus(
                        currentPatient.cash,
                        currentPatient.upi,
                        currentPatient.amount
                      )}
                    </strong>
                  </p>

                </div>

              </div>

              {/* ATTENDANCE */}

              <div className="attendance-box">

                {!attendanceMarked ? (
                  <button
                    className="attendance-btn"
                    onClick={
                      handleMarkAttendance
                    }
                  >
                    Mark Attendance
                  </button>
                ) : (
                  <div className="attendance-success">

                    <h3>
                      ✅ Attendance Marked
                    </h3>

                  </div>
                )}

              </div>

              {/* FEATURE CARDS */}

              <div className="feature-row">

                <div
                  className="feature-card"
                  onClick={() =>
                    navigate(
                      "/recharge",
                      {
                        state: {
                          returnToPopup:
                            true,

                          patient:
                            currentPatient,
                        },
                      }
                    )
                  }
                >

                  <FaWallet size={35} />

                  <p>Recharge</p>

                </div>

                <div
                  className="feature-card"
                  onClick={() =>
                    navigate(
                      "/openpatientlist",
                      {
                        state: {
                          returnToPopup:
                            true,

                          patient:
                            currentPatient,
                        },
                      }
                    )
                  }
                >

                  <FaFolder size={35} />

                  <p>
                    Open Patient File
                  </p>

                </div>

                <div className="feature-card">

                  <FaHome size={35} />

                  <p>Homepage</p>

                </div>

                <div
                  className="feature-card"
                  onClick={() =>
                    navigate(
                      "/prescription",
                      {
                        state: {
                          patient:
                            currentPatient,
                        },
                      }
                    )
                  }
                >

                  <FaFilePrescription
                    size={35}
                  />

                  <p>Prescription</p>

                </div>

                <div
                  className="feature-card"
                  onClick={() =>
                    navigate(
                      "/treatment-protocol",
                      {
                        state: {
                          patient:
                            currentPatient,
                        },
                      }
                    )
                  }
                >

                  <FaClipboardList
                    size={35}
                  />

                  <p>
                    Treatment Protocol
                  </p>

                </div>

                <div
                  className="feature-card"
                  onClick={() =>
                    navigate(
                      "/attendance",
                      {
                        state: {
                          patient:
                            currentPatient,
                        },
                      }
                    )
                  }
                >

                  <FaCalendarCheck
                    size={35}
                  />

                  <p>
                    Attendance Sheet
                  </p>

                </div>

              </div>

              {/* STATS */}

              <div className="stats-row">

                <div>

                  <h3>Attendance</h3>

                  <h2>72%</h2>

                  <p>Good</p>

                </div>

                <div>

                  <h3>Punctuality</h3>

                  <h2>85%</h2>

                  <p>Excellent</p>

                </div>

              </div>

              {/* WHATSAPP */}

              <button className="whatsapp-btn">

                <FaWhatsapp />

                Share ID on WhatsApp

              </button>

            </div>

          </div>
        )}

      {/* ======================================
          PROFILE MODAL
      ====================================== */}

      {showProfileModal && (
        <div className="modal-overlay">

          <div className="profile-modal">

            <FaTimes
              className="close-icon"
              onClick={() =>
                setShowProfileModal(
                  false
                )
              }
            />

            <h2>
              Clinic Profile
            </h2>

            <p>
              <strong>ID:</strong>{" "}
              {userData?.id || "-"}
            </p>

            <p>
              <strong>Name:</strong>{" "}
              {userData?.name || "-"}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {userData?.email || "-"}
            </p>

            <p>
              <strong>Mobile:</strong>{" "}
              {userData?.mobile || "-"}
            </p>

            <p>
              <strong>Role:</strong>{" "}
              {userData?.role || "-"}
            </p>

          </div>

        </div>
      )}

    </div>
  );
};

export default HomePage;