import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.png";

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">

        {/* Left Section */}
 {/* Left Section */}
<div className="footer-col">
  <img
    src={logo}
    alt="Krishna Clinic Logo"
    className="footer-logo-img"
  />

  <h2 className="footer-logo">
    Krishna Clinic
  </h2>

  <p>
    Providing quality healthcare services with personalized care and
    advanced medical solutions for every patient.
  </p>

  <div className="social-icons">
    <a href="#">
      <FaFacebookF />
    </a>
    <a href="#">
      <FaTwitter />
    </a>
    <a href="#">
      <FaLinkedinIn />
    </a>
    <a href="#">
      <FaInstagram />
    </a>
  </div>
</div>

        {/* Services Section */}
        <div className="footer-col">
          <h3>More Services</h3>

          <ul>
            <li>About Us</li>
            {/* <li>Our Doctors</li>
            <li>Blog</li> */}
            <li>Appointments</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-col">
          <h3>Contact</h3>

          <p className="contact-item">
            <FaEnvelope /> info@krishnaclinic.com
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          Copyright © 2026 Krishna Clinic. All Rights Reserved.
        </p>

        <div className="footer-links">
          <span>Terms & Conditions</span>
          <span>FAQ</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;