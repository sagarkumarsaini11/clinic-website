import React from 'react';
import './Hero.css';
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {

  const scrollToAppointment = () => {
    const section = document.getElementById("appointment");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className='hero container'>
      <div className='hero-text'>

        <h1>
          We Ensures most Effective Treatment for their Specific Needs
        </h1>

        <p>
          Krishna Advance Physio Clinic Leverages advance technology to
          deliver personalized physiotherapy care.
        </p>

        <button
          className="appointment-btn"
          onClick={scrollToAppointment}
        >
          <span>Book Appointment</span>

          <div className="arrow-circle">
            <FaArrowRight />
          </div>
        </button>

      </div>
    </div>
  );
};

export default Hero;