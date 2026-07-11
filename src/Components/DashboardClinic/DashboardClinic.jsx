import React, { useEffect, useState } from "react";
import "./DashboardClinic.css";

import {
  FaWallet,
  FaUserCheck,
  FaUserMd,
  FaCalendarAlt,
  FaBell,
  FaChartLine,
  FaHeartbeat,
  FaUsers,
  FaArrowUp,
  FaArrowDown,
  FaSearch,
  FaCalendarCheck,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function DashboardClinic() {

  const [todayRevenue, setTodayRevenue] = useState(0);
  const [attendance, setAttendance] = useState(0);
  const [consulted, setConsulted] = useState(0);
  const [pendingAppointments, setPendingAppointments] = useState(0);

  const [search, setSearch] = useState("");

  const todayDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {

    let revenue = 0;
    let attend = 0;
    let consult = 0;
    let pending = 0;

    const timer = setInterval(() => {

      revenue += 1850;
      attend += 2;
      consult += 1;
      pending += 1;

      if (revenue >= 84250) revenue = 84250;
      if (attend >= 58) attend = 58;
      if (consult >= 34) consult = 34;
      if (pending >= 7) pending = 7;

      setTodayRevenue(revenue);
      setAttendance(attend);
      setConsulted(consult);
      setPendingAppointments(pending);

      if (
        revenue === 84250 &&
        attend === 58 &&
        consult === 34 &&
        pending === 7
      ) {
        clearInterval(timer);
      }

    }, 30);

    return () => clearInterval(timer);

  }, []);

  const revenueData = [
    8, 10, 12, 14, 13, 15, 17,
    19, 21, 20, 22, 24, 26, 25,
    28, 30, 32, 34, 33, 35, 37,
    39, 40, 42, 45,
  ];

  const appointments = [
    {
      id: 1,
      patient: "Anjali Sharma",
      doctor: "Dr. Rahul",
      time: "09:30 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      patient: "Rahul Verma",
      doctor: "Dr. Priya",
      time: "10:15 AM",
      status: "Waiting",
    },
    {
      id: 3,
      patient: "Meena Joshi",
      doctor: "Dr. Deepak",
      time: "11:45 AM",
      status: "Completed",
    },
    {
      id: 4,
      patient: "Vikas Kumar",
      doctor: "Dr. Rahul",
      time: "01:30 PM",
      status: "Confirmed",
    },
    {
      id: 5,
      patient: "Pooja Sharma",
      doctor: "Dr. Priya",
      time: "03:15 PM",
      status: "Waiting",
    },
  ];

  const rechargeAlerts = [
    {
      id: 1,
      patient: "Rohit Kumar",
      message: "1 Session Left",
      color: "#ef4444",
    },
    {
      id: 2,
      patient: "Anita Sharma",
      message: "Recharge Due",
      color: "#f97316",
    },
    {
      id: 3,
      patient: "Rakesh Singh",
      message: "Package Expiring",
      color: "#8b5cf6",
    },
    {
      id: 4,
      patient: "Priya Verma",
      message: "2 Sessions Left",
      color: "#3b82f6",
    },
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Rahul",
      patients: 18,
      status: "Available",
    },
    {
      id: 2,
      name: "Dr. Priya",
      patients: 14,
      status: "Busy",
    },
    {
      id: 3,
      name: "Dr. Deepak",
      patients: 11,
      status: "Available",
    },
  ];

  const recentPatients = [
    {
      id: 1,
      name: "Rakesh Kumar",
      problem: "Back Pain",
    },
    {
      id: 2,
      name: "Neha Sharma",
      problem: "Neck Pain",
    },
    {
      id: 3,
      name: "Amit Verma",
      problem: "Knee Pain",
    },
    {
      id: 4,
      name: "Pooja Singh",
      problem: "Shoulder Pain",
    },
    {
      id: 5,
      name: "Vikas Gupta",
      problem: "Sciatica",
    },
  ];

  const activities = [
    {
      id: 1,
      title: "New Patient Registered",
      time: "10 Minutes Ago",
    },
    {
      id: 2,
      title: "Attendance Updated",
      time: "25 Minutes Ago",
    },
    {
      id: 3,
      title: "Package Recharged",
      time: "1 Hour Ago",
    },
    {
      id: 4,
      title: "Prescription Printed",
      time: "2 Hours Ago",
    },
    {
      id: 5,
      title: "Appointment Completed",
      time: "3 Hours Ago",
    },
  ];

  const referralData = {
    total: 164,
    converted: 118,
    percentage: "72%",
  };

  const summaryData = [
    {
      title: "Today's Collection",
      value: "₹84,250",
    },
    {
      title: "New Patients",
      value: "19",
    },
    {
      title: "Follow Ups",
      value: "32",
    },
    {
      title: "Pending Recharge",
      value: "7",
    },
  ];

 return (

      <div className="dashboard-page-clinic-dashboard">

        {/* ================= HEADER ================= */}

        <div className="dashboard-header-clinic-dashboard">

          <div className="dashboard-header-left-clinic-dashboard">

            <h1>
              Welcome Back 👋
            </h1>

            <p>
              Have a great day! Here's today's clinic overview.
            </p>

          </div>

          <div className="dashboard-header-right-clinic-dashboard">

            <div className="dashboard-search-clinic-dashboard">

              <FaSearch />

              <input
                type="text"
                placeholder="Search patient..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            <div className="dashboard-date-box-clinic-dashboard">

              <FaCalendarAlt />

              <div>

                <span className="dashboard-date-title-clinic-dashboard">
                  Today
                </span>

                <h5>{todayDate}</h5>

              </div>

            </div>

          </div>

        </div>



        {/* ================= QUICK STATUS ================= */}

        <div className="dashboard-status-strip-clinic-dashboard">

          <div className="dashboard-status-box-clinic-dashboard">

            <FaCalendarCheck />

            <div>

              <h4>Appointments</h4>

              <span>
                {appointments.length} Scheduled Today
              </span>

            </div>

          </div>

          <div className="dashboard-status-box-clinic-dashboard">

            <FaClock />

            <div>

              <h4>Clinic Timing</h4>

              <span>
                09:00 AM - 08:00 PM
              </span>

            </div>

          </div>

          <div className="dashboard-status-box-clinic-dashboard">

            <FaExclamationTriangle />

            <div>

              <h4>Recharge Alerts</h4>

              <span>
                {rechargeAlerts.length} Patients Pending
              </span>

            </div>

          </div>

        </div>

       {/* ================= TOP STATISTIC CARDS ================= */}

        <div className="dashboard-top-grid-clinic-dashboard">

          {/* ========= TODAY'S REVENUE ========= */}

          <div className="dashboard-card-clinic-dashboard dashboard-revenue-card-clinic-dashboard">

            <div className="dashboard-card-top-clinic-dashboard">

              <div className="dashboard-icon-clinic-dashboard green">

                <FaWallet />

              </div>

              <div className="dashboard-growth-clinic-dashboard up">

                <FaArrowUp />

                <span>+18%</span>

              </div>

            </div>

            <h5>
              Today's Revenue
            </h5>

            <h2>
              ₹{todayRevenue.toLocaleString("en-IN")}
            </h2>

            <p className="dashboard-bottom-text-clinic-dashboard">
              Cash ₹48,600
              <br />
              UPI ₹35,650
            </p>

            <div className="dashboard-progress-clinic-dashboard">

              <div
                className="dashboard-progress-fill-clinic-dashboard green-progress-clinic-dashboard"
                style={{
                  width: "86%",
                }}
              ></div>

            </div>

            <small>
              86% of Daily Target
            </small>

            <div className="dashboard-wave-clinic-dashboard green-wave"></div>

          </div>



          {/* ========= ATTENDANCE ========= */}

          <div className="dashboard-card-clinic-dashboard dashboard-attendance-card-clinic-dashboard">

            <div className="dashboard-card-top-clinic-dashboard">

              <div className="dashboard-icon-clinic-dashboard blue">

                <FaUserCheck />

              </div>

              <div className="dashboard-growth-clinic-dashboard up">

                <FaArrowUp />

                <span>+11%</span>

              </div>

            </div>

            <h5>
              Staff Attendance
            </h5>

            <h2>
              {attendance}/65
            </h2>

            <p className="dashboard-bottom-text-clinic-dashboard">
              Staff Present Today
            </p>

            <div className="dashboard-progress-clinic-dashboard">

              <div
                className="dashboard-progress-fill-clinic-dashboard blue-progress-clinic-dashboard"
                style={{
                  width: "89%",
                }}
              ></div>

            </div>

            <small>
              Attendance Rate 89%
            </small>

            <div className="dashboard-wave-clinic-dashboard blue-wave"></div>

          </div>

          {/* ========= CONSULTED PATIENTS ========= */}

          <div className="dashboard-card-clinic-dashboard dashboard-consulted-card-clinic-dashboard">

            <div className="dashboard-card-top-clinic-dashboard">

              <div className="dashboard-icon-clinic-dashboard purple">

                <FaUserMd />

              </div>

              <div className="dashboard-growth-clinic-dashboard up">

                <FaArrowUp />

                <span>+9%</span>

              </div>

            </div>

            <h5>
              Consulted Patients
            </h5>

            <h2>
              {consulted}
            </h2>

            <p className="dashboard-bottom-text-clinic-dashboard">
              OPD + Follow Up Patients
            </p>

            <div className="dashboard-progress-clinic-dashboard">

              <div
                className="dashboard-progress-fill-clinic-dashboard purple-progress-clinic-dashboard"
                style={{
                  width: "78%",
                }}
              ></div>

            </div>

            <small>
              Consultation Rate 78%
            </small>

            <div className="dashboard-wave-clinic-dashboard purple-wave"></div>

          </div>



          {/* ========= PENDING APPOINTMENTS ========= */}

          <div className="dashboard-card-clinic-dashboard dashboard-pending-card-clinic-dashboard">

            <div className="dashboard-card-top-clinic-dashboard">

              <div className="dashboard-icon-clinic-dashboard orange">

                <FaCalendarAlt />

              </div>

              <div className="dashboard-growth-clinic-dashboard down">

                <FaArrowDown />

                <span>5%</span>

              </div>

            </div>

            <h5>
              Pending Appointments
            </h5>

            <h2>
              {pendingAppointments}
            </h2>

            <p className="dashboard-bottom-text-clinic-dashboard">
              Waiting For Confirmation
            </p>

            <div className="dashboard-progress-clinic-dashboard">

              <div
                className="dashboard-progress-fill-clinic-dashboard orange-progress-clinic-dashboard"
                style={{
                  width: "35%",
                }}
              ></div>

            </div>

            <small>
              35% Pending
            </small>

            <div className="dashboard-wave-clinic-dashboard orange-wave"></div>

          </div>

        </div>





        {/* ==========================================
                MAIN DASHBOARD GRID START
        =========================================== */}

        <div className="dashboard-main-grid-clinic-dashboard">

{/* ==========================================
                REVENUE ANALYTICS
        =========================================== */}

        <div className="dashboard-chart-card-clinic-dashboard">

          <div className="dashboard-section-header-clinic-dashboard">

            <div>

              <h3>Revenue Analytics</h3>

              <p>Last 25 Days Collection</p>

            </div>

            <button className="dashboard-view-btn-clinic-dashboard">
              View Report
            </button>

          </div>

          <div className="dashboard-chart-clinic-dashboard">

            {revenueData.map((value, index) => (

              <div
                key={index}
                className="dashboard-chart-column-clinic-dashboard"
              >

                <div
                  className="dashboard-chart-bar-clinic-dashboard"
                  style={{
                    height: `${value * 6}px`,
                    animationDelay: `${index * 0.05}s`,
                  }}
                ></div>

                <span>
                  {index + 1}
                </span>

              </div>

            ))}

          </div>

          <div className="dashboard-chart-footer-clinic-dashboard">

            <div className="dashboard-chart-info-clinic-dashboard">

              <div className="dashboard-chart-dot-clinic-dashboard blue-dot-clinic-dashboard"></div>

              <span>
                Revenue Growth
              </span>

            </div>

            <div className="dashboard-chart-info-clinic-dashboard">

              <div className="dashboard-chart-dot-clinic-dashboard green-dot-clinic-dashboard"></div>

              <span>
                Daily Target
              </span>

            </div>

            <div className="dashboard-chart-info-clinic-dashboard">

              <FaChartLine />

              <strong>
                +22.4% This Month
              </strong>

            </div>

          </div>

        </div>
        {/* ==========================================
                TODAY'S APPOINTMENTS
        =========================================== */}

        <div className="dashboard-appointment-card-clinic-dashboard">

          <div className="dashboard-section-header-clinic-dashboard">

            <div>

              <h3>Today's Appointments</h3>

              <p>
                {appointments.length} Patients Scheduled
              </p>

            </div>

            <button className="dashboard-view-btn-clinic-dashboard">
              View All
            </button>

          </div>

          <div className="dashboard-appointment-list-clinic-dashboard">

            {appointments.map((item) => (

              <div
                key={item.id}
                className="dashboard-appointment-item-clinic-dashboard"
              >

                <div className="dashboard-avatar-clinic-dashboard">

                  {item.patient.charAt(0)}

                </div>

                <div className="dashboard-appointment-info-clinic-dashboard">

                  <h4>{item.patient}</h4>

                  <span>
                    {item.doctor}
                  </span>

                </div>

                <div className="dashboard-appointment-time-clinic-dashboard">

                  <strong>
                    {item.time}
                  </strong>

                  <small
                    className={
                      item.status === "Completed"
                        ? "status-green"
                        : item.status === "Waiting"
                        ? "status-orange"
                        : "status-blue"
                    }
                  >
                    {item.status}
                  </small>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* ========= End dashboard-main-grid-clinic-dashboard ========= */}
  


      {/* ==========================================
              BOTTOM DASHBOARD GRID
      ========================================== */}

      <div className="dashboard-bottom-grid-clinic-dashboard">

{/* ==========================================
                RECHARGE ALERTS
        ========================================== */}

        <div className="dashboard-alert-card-clinic-dashboard">

          <div className="dashboard-section-header-clinic-dashboard">

            <div>

              <h3>Recharge Alerts</h3>

              <p>
                {rechargeAlerts.length} Patients Need Attention
              </p>

            </div>

            <button className="dashboard-view-btn-clinic-dashboard">
              View All
            </button>

          </div>

          <div className="dashboard-alert-list-clinic-dashboard">

            {rechargeAlerts.map((item) => (

              <div
                key={item.id}
                className="dashboard-alert-item-clinic-dashboard"
              >

                <div
                  className="dashboard-alert-dot-clinic-dashboard"
                  style={{
                    background: item.color,
                  }}
                ></div>

                <div className="dashboard-alert-info-clinic-dashboard">

                  <h4>
                    {item.patient}
                  </h4>

                  <span>
                    {item.message}
                  </span>

                </div>

                <button className="dashboard-action-btn-clinic-dashboard">

                  Recharge

                </button>

              </div>

            ))}

          </div>

        </div>

        {/* ==========================================
                PACKAGE SUMMARY
        ========================================== */}

        <div className="dashboard-package-card-clinic-dashboard">

          <div className="dashboard-section-header-clinic-dashboard">

            <div>

              <h3>Package Summary</h3>

              <p>
                Active Treatment Packages
              </p>

            </div>

            <button className="dashboard-view-btn-clinic-dashboard">
              Details
            </button>

          </div>

          <div className="dashboard-package-box-clinic-dashboard">

            <div className="dashboard-package-item-clinic-dashboard">

              <div className="dashboard-package-icon-clinic-dashboard active-package-clinic-dashboard">

                <FaHeartbeat />

              </div>

              <div className="dashboard-package-content-clinic-dashboard">

                <h4>Active Packages</h4>

                <h2>142</h2>

                <div className="dashboard-progress-clinic-dashboard">

                  <div
                    className="dashboard-progress-fill-clinic-dashboard green-progress-clinic-dashboard"
                    style={{ width: "82%" }}
                  ></div>

                </div>

              </div>

            </div>



            <div className="dashboard-package-item-clinic-dashboard">

              <div className="dashboard-package-icon-clinic-dashboard complete-package-clinic-dashboard">

                <FaChartLine />

              </div>

              <div className="dashboard-package-content-clinic-dashboard">

                <h4>Completed</h4>

                <h2>58</h2>

                <div className="dashboard-progress-clinic-dashboard">

                  <div
                    className="dashboard-progress-fill-clinic-dashboard blue-progress-clinic-dashboard"
                    style={{ width: "65%" }}
                  ></div>

                </div>

              </div>

            </div>



            <div className="dashboard-package-item-clinic-dashboard">

              <div className="dashboard-package-icon-clinic-dashboard expire-package-clinic-dashboard">

                <FaBell />

              </div>

              <div className="dashboard-package-content-clinic-dashboard">

                <h4>Expiring Soon</h4>

                <h2>12</h2>

                <div className="dashboard-progress-clinic-dashboard">

                  <div
                    className="dashboard-progress-fill-clinic-dashboard orange-progress-clinic-dashboard"
                    style={{ width: "35%" }}
                  ></div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ==========================================
                DOCTOR AVAILABILITY
        ========================================== */}

        <div className="dashboard-doctor-card-clinic-dashboard">

          <div className="dashboard-section-header-clinic-dashboard">

            <div>

              <h3>Doctor Availability</h3>

              <p>
                {doctors.length} Doctors Today
              </p>

            </div>

            <button className="dashboard-view-btn-clinic-dashboard">
              View All
            </button>

          </div>

          <div className="dashboard-doctor-list-clinic-dashboard">

            {doctors.map((doctor) => (

              <div
                key={doctor.id}
                className="dashboard-doctor-item-clinic-dashboard"
              >

                <div className="dashboard-avatar-clinic-dashboard doctor-avatar-clinic-dashboard">

                  {doctor.name.charAt(3)}

                </div>

                <div className="dashboard-doctor-info-clinic-dashboard">

                  <h4>
                    {doctor.name}
                  </h4>

                  <span>
                    {doctor.patients} Patients Today
                  </span>

                  <div className="dashboard-progress-clinic-dashboard">

                    <div
                      className="dashboard-progress-fill-clinic-dashboard green-progress-clinic-dashboard"
                      style={{
                        width: `${Math.min(
                          (doctor.patients / 20) * 100,
                          100
                        )}%`,
                      }}
                    ></div>

                  </div>

                </div>

                <div
                  className={
                    doctor.status === "Available"
                      ? "doctor-status-clinic-dashboard available-clinic-dashboard"
                      : "doctor-status-clinic-dashboard busy-clinic-dashboard"
                  }
                >
                  <span className="doctor-status-dot-clinic-dashboard"></span>

                  {doctor.status}

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* ==========================================
                RECENT PATIENTS
        ========================================== */}

        <div className="dashboard-patient-card-clinic-dashboard">

          <div className="dashboard-section-header-clinic-dashboard">

            <div>

              <h3>Recent Patients</h3>

              <p>
                Recently Registered
              </p>

            </div>

            <button className="dashboard-view-btn-clinic-dashboard">
              View All
            </button>

          </div>

          <div className="dashboard-patient-list-clinic-dashboard">

            {recentPatients.map((patient) => (

              <div
                key={patient.id}
                className="dashboard-patient-item-clinic-dashboard"
              >

                <div className="dashboard-avatar-clinic-dashboard">

                  {patient.name.charAt(0)}

                </div>

                <div className="dashboard-patient-info-clinic-dashboard">

                  <h4>
                    {patient.name}
                  </h4>

                  <span>
                    {patient.problem}
                  </span>

                </div>

                <div className="dashboard-patient-status-clinic-dashboard">

                  New

                </div>

              </div>

            ))}

          </div>

        </div>



        {/* ==========================================
                REFERRAL SUMMARY
        ========================================== */}

        <div className="dashboard-referral-card-clinic-dashboard">

          <div className="dashboard-section-header-clinic-dashboard">

            <div>

              <h3>Referral Summary</h3>

              <p>
                This Month Performance
              </p>

            </div>

          </div>

          <div className="dashboard-referral-box-clinic-dashboard">

            <div className="dashboard-referral-item-clinic-dashboard">

              <div className="dashboard-referral-icon-clinic-dashboard total-referral-clinic-dashboard">

                <FaUsers />

              </div>

              <div>

                <h2>
                  {referralData.total}
                </h2>

                <span>
                  Total Referrals
                </span>

              </div>

            </div>



            <div className="dashboard-referral-item-clinic-dashboard">

              <div className="dashboard-referral-icon-clinic-dashboard converted-referral-clinic-dashboard">

                <FaUserCheck />

              </div>

              <div>

                <h2>
                  {referralData.converted}
                </h2>

                <span>
                  Converted
                </span>

              </div>

            </div>



            <div className="dashboard-referral-rate-clinic-dashboard">

              <h1>
                {referralData.percentage}
              </h1>

              <span>
                Conversion Rate
              </span>

            </div>

          </div>

        </div>
        {/* ==========================================
                RECENT ACTIVITY
        ========================================== */}

        <div className="dashboard-activity-card-clinic-dashboard">

          <div className="dashboard-section-header-clinic-dashboard">

            <div>

              <h3>Recent Activity</h3>

              <p>
                Today's Updates
              </p>

            </div>

            <button className="dashboard-view-btn-clinic-dashboard">
              View All
            </button>

          </div>

          <div className="dashboard-activity-list-clinic-dashboard">

            {activities.map((activity) => (

              <div
                key={activity.id}
                className="dashboard-activity-item-clinic-dashboard"
              >

                <div className="dashboard-activity-dot-clinic-dashboard"></div>

                <div className="dashboard-activity-info-clinic-dashboard">

                  <h4>
                    {activity.title}
                  </h4>

                  <span>
                    {activity.time}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>



    {/* ==========================================
                TODAY SUMMARY
        ========================================== */}

        <div className="dashboard-summary-card-clinic-dashboard">

          <div className="dashboard-section-header-clinic-dashboard">

            <div>
              <h3>Today's Summary</h3>
              <p>Clinic Performance</p>
            </div>

          </div>

          <div className="dashboard-summary-grid-clinic-dashboard">

            {summaryData.map((item, index) => (

              <div
                key={index}
                className="dashboard-summary-box-clinic-dashboard"
              >
                <h2>{item.value}</h2>
                <span>{item.title}</span>
              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}
        
   

      