import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact" id="contact">
 

          <div className="contact-title">
                   <p>CONTACT US</p>
                    <h2>Get in Touch</h2>
          </div>

           <div className="contact-left"></div>
           <div className="contact-left">

        <h3>
          Send us a message
          <span className="mail-icon">📩</span>
        </h3>

        <p>
          Krishna Advance Physio Clinic is committed to providing
          professional physiotherapy care and personalized treatment
          for every patient. Whether you have questions about our
          services, wish to book an appointment, or need guidance
          regarding rehabilitation and pain management, our team is
          always ready to assist you.
        </p>

        <p>
          We specialize in advanced physiotherapy treatments,
          sports injury rehabilitation, posture correction,
          joint pain management, neurological rehabilitation,
          and recovery programs designed to improve mobility
          and overall well-being.
        </p>

        <ul className="contact-details">

          <li>
            <span>📧</span>
            krishnaadvancephysioclinic@gmail.com
          </li>

          <li>
            <span>📞</span>
            +91 7467067466
          </li>

          <li>
            <span>📍</span>
            M-38, Shiv Mandir Road,
            Hakikat Nagar,
            Saharanpur, Uttar Pradesh
          </li>

          <li>
            <span>🕒</span>
            Monday - Saturday : 10:00 AM - 8:00 PM
          </li>

        </ul>

      </div>

    </section>
  );
};

export default Contact;