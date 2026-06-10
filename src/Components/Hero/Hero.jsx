import React, { useState, useEffect } from "react";
import "./Hero.css";
import { FaArrowRight } from "react-icons/fa";

import hero1 from "../../assets/hero1.jpg";
import hero2 from "../../assets/hero2.jpeg";
import hero3 from "../../assets/hero3.jpg";
import hero4 from "../../assets/hero4.jpeg";

const Hero = () => {

  const images = [hero1, hero2, hero3, hero4];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentImage(
        (prev) => (prev + 1) % images.length
      );

    }, 4000);

    return () => clearInterval(interval);

  }, []);

  const scrollToAppointment = () => {

    const section =
      document.getElementById("appointment");

    if (section) {

      section.scrollIntoView({
        behavior: "smooth",
      });

    }
  };

  return (
    <div
      className="hero container"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(14, 91, 89, 0.45),
            rgba(41, 130, 122, 0.45)
          ),
          url(${images[currentImage]})
        `,
      }}
    >
      <div className="hero-text">

        <h1>
          We Ensures most Effective Treatment
          for their Specific Needs
        </h1>

        <p>
          Krishna Advance Physio Clinic
          Leverages advance technology to
          deliver personalized physiotherapy
          care.
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